using Aurora.Application.Common.Models;
using Aurora.Application.DTOs.CMS;
using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

public class CategoriesController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoriesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("menu")]
    public async Task<ActionResult<ApiResponse<List<CategoryMenuDto>>>> GetMenu()
    {
        var allCategories = await _unitOfWork.Categories.GetAllAsync();
        
        // Build hierarchy
        var menu = allCategories
            .Where(c => c.ParentCategoryId == null)
            .Select(c => MapToMenuDto(c, allCategories))
            .ToList();

        return Ok(ApiResponse<List<CategoryMenuDto>>.Success(menu));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<Category>>> CreateCategory(Category category)
    {
        await _unitOfWork.Categories.AddAsync(category);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<Category>.Success(category));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> UpdateCategory(int id, Category category)
    {
        if (id != category.Id) return BadRequest();
        await _unitOfWork.Categories.UpdateAsync(category);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<string>.Success("Category updated"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> DeleteCategory(int id)
    {
        var category = await _unitOfWork.Categories.GetByIdAsync(id);
        if (category == null) return NotFound();
        await _unitOfWork.Categories.DeleteAsync(category);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<string>.Success("Category deleted"));
    }

    private CategoryMenuDto MapToMenuDto(Category category, IReadOnlyList<Category> all)
    {
        return new CategoryMenuDto
        {
            Id = category.Id,
            Name = category.Name,
            Slug = category.Slug,
            SubCategories = all
                .Where(c => c.ParentCategoryId == category.Id)
                .Select(c => MapToMenuDto(c, all))
                .ToList()
        };
    }
}
