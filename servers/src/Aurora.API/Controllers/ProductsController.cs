using AutoMapper;
using Aurora.Application.Common.Models;
using Aurora.Application.DTOs.Product;
using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProductsController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResponse<ProductDto>>>> GetProducts(
        [FromQuery] int pageIndex = 1, 
        [FromQuery] int pageSize = 10, 
        [FromQuery] string? search = null, 
        [FromQuery] int? categoryId = null, 
        [FromQuery] int? brandId = null, 
        [FromQuery] string? sortBy = null)
    {
        var (items, totalCount) = await _unitOfWork.Products.GetPagedProductsAsync(pageIndex, pageSize, search, categoryId, brandId, sortBy);
        var dtos = _mapper.Map<IReadOnlyList<ProductDto>>(items);
        var response = new PagedResponse<ProductDto>(dtos, totalCount, pageIndex, pageSize);
        return Ok(ApiResponse<PagedResponse<ProductDto>>.Success(response));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<ApiResponse<ProductDto>>> GetProduct(string slug)
    {
        var product = await _unitOfWork.Products.GetBySlugAsync(slug);
        if (product == null)
            return NotFound(ApiResponse<ProductDto>.Failure(new List<string> { "Product not found" }));

        return Ok(ApiResponse<ProductDto>.Success(_mapper.Map<ProductDto>(product)));
    }

    [HttpGet("featured")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProductDto>>>> GetFeaturedProducts([FromQuery] int count = 8)
    {
        var products = await _unitOfWork.Products.GetFeaturedProductsAsync(count);
        return Ok(ApiResponse<IReadOnlyList<ProductDto>>.Success(_mapper.Map<IReadOnlyList<ProductDto>>(products)));
    }

    [HttpGet("trending")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProductDto>>>> GetTrendingProducts([FromQuery] int count = 8)
    {
        var products = await _unitOfWork.Products.GetTrendingProductsAsync(count);
        return Ok(ApiResponse<IReadOnlyList<ProductDto>>.Success(_mapper.Map<IReadOnlyList<ProductDto>>(products)));
    }

    [HttpGet("bestSelling")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProductDto>>>> GetBestSellingProducts([FromQuery] int count = 8)
    {
        var products = await _unitOfWork.Products.GetBestSellingProductsAsync(count);
        return Ok(ApiResponse<IReadOnlyList<ProductDto>>.Success(_mapper.Map<IReadOnlyList<ProductDto>>(products)));
    }

    [HttpGet("by-category/{slug}")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProductDto>>>> GetByCategory(string slug)
    {
        var products = await _unitOfWork.Products.GetByCategorySlugAsync(slug);
        return Ok(ApiResponse<IReadOnlyList<ProductDto>>.Success(_mapper.Map<IReadOnlyList<ProductDto>>(products)));
    }

    [HttpGet("by-brand/{slug}")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProductDto>>>> GetByBrand(string slug)
    {
        var products = await _unitOfWork.Products.GetByBrandSlugAsync(slug);
        return Ok(ApiResponse<IReadOnlyList<ProductDto>>.Success(_mapper.Map<IReadOnlyList<ProductDto>>(products)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<ProductDto>>> CreateProduct(ProductCreateDto createDto)
    {
        var product = _mapper.Map<Product>(createDto);
        product.Slug = createDto.Name.ToLower().Replace(" ", "-"); // Basic slug logic
        
        await _unitOfWork.Products.AddAsync(product);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<ProductDto>.Success(_mapper.Map<ProductDto>(product)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> UpdateProduct(int id, ProductCreateDto updateDto)
    {
        var product = await _unitOfWork.Products.GetByIdAsync(id);
        if (product == null)
            return NotFound(ApiResponse<string>.Failure(new List<string> { "Product not found" }));

        _mapper.Map(updateDto, product);
        await _unitOfWork.Products.UpdateAsync(product);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<string>.Success("Product updated successfully"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> DeleteProduct(int id)
    {
        var product = await _unitOfWork.Products.GetByIdAsync(id);
        if (product == null)
            return NotFound(ApiResponse<string>.Failure(new List<string> { "Product not found" }));

        await _unitOfWork.Products.DeleteAsync(product);
        await _unitOfWork.SaveAsync();

        return Ok(ApiResponse<string>.Success("Product deleted successfully"));
    }
}
