using System.Security.Claims;
using AutoMapper;
using Aurora.Application.Common.Models;
using Aurora.Application.DTOs.Product;
using Aurora.Application.DTOs.Wishlist;
using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

[Authorize]
public class WishlistController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public WishlistController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<WishlistDto>>>> GetWishlist()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var wishlist = await _unitOfWork.Wishlists.GetWishlistByUserIdAsync(userId);
        var dtos = wishlist.Select(w => new WishlistDto
        {
            Id = w.Id,
            ProductId = w.ProductId,
            Product = _mapper.Map<ProductDto>(w.Product)
        }).ToList();

        return Ok(ApiResponse<IReadOnlyList<WishlistDto>>.Success(dtos));
    }

    [HttpPost("add")]
    public async Task<ActionResult<ApiResponse<string>>> AddToWishlist(WishlistCreateDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var existing = await _unitOfWork.Wishlists.GetUserWishlistItemAsync(userId, dto.ProductId);
        if (existing != null)
            return Ok(ApiResponse<string>.Success("Product already in wishlist"));

        var item = new Wishlist
        {
            UserId = userId,
            ProductId = dto.ProductId
        };

        await _unitOfWork.Wishlists.AddAsync(item);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<string>.Success("Product added to wishlist"));
    }

    [HttpDelete("remove/{id}")]
    public async Task<ActionResult<ApiResponse<string>>> RemoveFromWishlist(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var item = await _unitOfWork.Wishlists.GetByIdAsync(id);

        if (item == null || item.UserId != userId)
            return NotFound(ApiResponse<string>.Failure(new List<string> { "Item not found" }));

        await _unitOfWork.Wishlists.DeleteAsync(item);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<string>.Success("Product removed from wishlist"));
    }
}
