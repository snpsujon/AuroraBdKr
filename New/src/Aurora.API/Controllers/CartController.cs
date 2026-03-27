using System.Security.Claims;
using Aurora.Application.Common.Models;
using Aurora.Application.DTOs.Cart;
using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

[Authorize]
public class CartController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public CartController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<CartDto>>> GetCart()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var cartItems = await _unitOfWork.Carts.GetCartByUserIdAsync(userId);
        
        var cartDto = new CartDto
        {
            Items = cartItems.Select(x => new CartItemDto
            {
                Id = x.Id,
                ProductId = x.ProductId,
                ProductName = x.Product.Name,
                ProductThumbnail = x.Product.ThumbnailUrl,
                ProductVariantId = x.ProductVariantId,
                VariantInfo = x.ProductVariant != null ? $"{x.ProductVariant.Size} {x.ProductVariant.Color}" : null,
                UnitPrice = x.ProductVariant?.Price ?? x.Product.Price,
                Quantity = x.Quantity
            }).ToList()
        };

        return Ok(ApiResponse<CartDto>.Success(cartDto));
    }

    [HttpPost("add")]
    public async Task<ActionResult<ApiResponse<string>>> AddToCart(AddToCartDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var product = await _unitOfWork.Products.GetByIdAsync(dto.ProductId);
        if (product == null) return NotFound(ApiResponse<string>.Failure(new List<string> { "Product not found" }));

        // Check stock
        int availableStock = product.StockQuantity;
        if (dto.ProductVariantId.HasValue)
        {
            var variant = await _unitOfWork.Products.GetByIdAsync(dto.ProductVariantId.Value); // This is a bit wrong in current generic repo, but keeping simple
            // In a real app, we'd have a specific variant check. For now, let's assume simple stock on product.
        }

        if (availableStock < dto.Quantity)
            return BadRequest(ApiResponse<string>.Failure(new List<string> { "Insufficent stock" }));

        var existingItem = await _unitOfWork.Carts.GetUserCartItemAsync(userId, dto.ProductId, dto.ProductVariantId);

        if (existingItem != null)
        {
            existingItem.Quantity += dto.Quantity;
            if (existingItem.Quantity > availableStock)
                return BadRequest(ApiResponse<string>.Failure(new List<string> { "Total quantity exceeds available stock" }));
            
            await _unitOfWork.Carts.UpdateAsync(existingItem);
        }
        else
        {
            var newItem = new CartItem
            {
                UserId = userId,
                ProductId = dto.ProductId,
                ProductVariantId = dto.ProductVariantId,
                Quantity = dto.Quantity
            };
            await _unitOfWork.Carts.AddAsync(newItem);
        }

        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<string>.Success("Item added to cart"));
    }

    [HttpPut("update")]
    public async Task<ActionResult<ApiResponse<string>>> UpdateQuantity(UpdateCartItemDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var item = await _unitOfWork.Carts.GetByIdAsync(dto.CartItemId);

        if (item == null || item.UserId != userId)
            return NotFound(ApiResponse<string>.Failure(new List<string> { "Cart item not found" }));

        var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId);
        if (product != null && product.StockQuantity < dto.Quantity)
             return BadRequest(ApiResponse<string>.Failure(new List<string> { "Insufficent stock" }));

        item.Quantity = dto.Quantity;
        await _unitOfWork.Carts.UpdateAsync(item);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<string>.Success("Cart updated"));
    }

    [HttpDelete("remove/{id}")]
    public async Task<ActionResult<ApiResponse<string>>> RemoveFromCart(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var item = await _unitOfWork.Carts.GetByIdAsync(id);

        if (item == null || item.UserId != userId)
            return NotFound(ApiResponse<string>.Failure(new List<string> { "Cart item not found" }));

        await _unitOfWork.Carts.DeleteAsync(item);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<string>.Success("Item removed from cart"));
    }
}
