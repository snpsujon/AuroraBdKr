using System.Security.Claims;
using Aurora.Application.Common.Models;
using Aurora.Application.DTOs.Order;
using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

[Authorize]
public class OrdersController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public OrdersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost("create")]
    public async Task<ActionResult<ApiResponse<OrderDto>>> CreateOrder(OrderCreateDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var cartItems = await _unitOfWork.Carts.GetCartByUserIdAsync(userId);
        if (!cartItems.Any())
            return BadRequest(ApiResponse<OrderDto>.Failure(new List<string> { "Cart is empty" }));

        // Start Transaction
        // For simplicity, we'll just use the SaveAsync result, but in production use an actual DB Transaction

        var order = new Order
        {
            UserId = userId,
            OrderDate = DateTime.UtcNow,
            ShippingAddress = dto.ShippingAddress,
            Status = "Pending",
            TotalAmount = 0
        };

        foreach (var item in cartItems)
        {
            var product = item.Product;
            
            // Deduct Stock
            if (product.StockQuantity < item.Quantity)
                return BadRequest(ApiResponse<OrderDto>.Failure(new List<string> { $"Insufficient stock for {product.Name}" }));

            product.StockQuantity -= item.Quantity;
            product.TotalSales += item.Quantity; // Track sales

            var unitPrice = item.ProductVariant?.Price ?? product.Price;
            var orderItem = new OrderItem
            {
                ProductId = item.ProductId,
                ProductVariantId = item.ProductVariantId,
                Quantity = item.Quantity,
                UnitPrice = unitPrice
            };

            order.OrderItems.Add(orderItem);
            order.TotalAmount += unitPrice * item.Quantity;

            // Remove from cart
            await _unitOfWork.Carts.DeleteAsync(item);
        }

        // Place for payment gateway integration (Stripe/PayPal etc.)
        // bool paymentSuccess = await _paymentService.ProcessPayment(order.TotalAmount, dto.PaymentMethod);
        // if (!paymentSuccess) return BadRequest(...);

        await _unitOfWork.Orders.AddAsync(order);
        await _unitOfWork.SaveAsync();

        var responseDto = MapToDto(order);
        return Ok(ApiResponse<OrderDto>.Success(responseDto, "Order placed successfully"));
    }

    [HttpGet("myOrders")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<OrderDto>>>> GetMyOrders()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var orders = await _unitOfWork.Orders.GetOrdersByUserIdAsync(userId);
        var dtos = orders.Select(MapToDto).ToList();

        return Ok(ApiResponse<IReadOnlyList<OrderDto>>.Success(dtos));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<OrderDto>>> GetOrder(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var order = await _unitOfWork.Orders.GetOrderByIdWithItemsAsync(id);

        if (order == null) return NotFound();
        
        // Ensure user owns the order OR is admin
        if (order.UserId != userId && !User.IsInRole("Admin"))
            return Unauthorized();

        return Ok(ApiResponse<OrderDto>.Success(MapToDto(order)));
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<OrderDto>>>> GetAllOrders()
    {
        var orders = await _unitOfWork.Orders.GetAllOrdersWithItemsAsync();
        var dtos = orders.Select(MapToDto).ToList();
        return Ok(ApiResponse<IReadOnlyList<OrderDto>>.Success(dtos));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("status/{id}")]
    public async Task<ActionResult<ApiResponse<string>>> UpdateOrderStatus(int id, OrderStatusUpdateDto dto)
    {
        var order = await _unitOfWork.Orders.GetByIdAsync(id);
        if (order == null) return NotFound();

        order.Status = dto.Status;
        if (!string.IsNullOrEmpty(dto.TrackingNumber))
            order.TrackingNumber = dto.TrackingNumber;

        await _unitOfWork.Orders.UpdateAsync(order);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<string>.Success("Order status updated"));
    }

    private OrderDto MapToDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            ShippingAddress = order.ShippingAddress,
            TrackingNumber = order.TrackingNumber,
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductName = oi.Product?.Name ?? "Unknown",
                Quantity = oi.Quantity,
                UnitPrice = oi.UnitPrice
            }).ToList()
        };
    }
}
