using System.Security.Claims;
using Aurora.Application.Common.Models;
using Aurora.Application.DTOs.Review;
using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

public class ReviewsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public ReviewsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("product/{productId}")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ReviewDto>>>> GetProductReviews(int productId)
    {
        var reviews = await _unitOfWork.Reviews.GetApprovedReviewsByProductIdAsync(productId);
        var dtos = reviews.Select(r => new ReviewDto
        {
            Id = r.Id,
            UserFullName = r.UserFullName,
            Rating = r.Rating,
            Comment = r.Comment,
            CreatedAt = r.CreatedAt
        }).ToList();

        return Ok(ApiResponse<IReadOnlyList<ReviewDto>>.Success(dtos));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<string>>> CreateReview(ReviewCreateDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userName = User.Identity?.Name ?? "Anonymous";

        if (userId == null) return Unauthorized();

        var review = new Review
        {
            UserId = userId,
            UserFullName = userName,
            ProductId = dto.ProductId,
            Rating = dto.Rating,
            Comment = dto.Comment,
            IsApproved = true // Auto-approve for demo, usually false
        };

        await _unitOfWork.Reviews.AddAsync(review);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<string>.Success("Review submitted successfully"));
    }
}
