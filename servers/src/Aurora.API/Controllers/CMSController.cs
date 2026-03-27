using AutoMapper;
using Aurora.Application.Common.Models;
using Aurora.Application.DTOs.CMS;
using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

public class CMSController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CMSController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    // SLIDERS
    [HttpGet("sliders")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<Slider>>>> GetSliders()
    {
        var sliders = await _unitOfWork.Sliders.GetAllAsync();
        return Ok(ApiResponse<IReadOnlyList<Slider>>.Success(sliders.Where(s => s.IsActive).OrderBy(s => s.DisplayOrder).ToList()));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("sliders")]
    public async Task<ActionResult<ApiResponse<Slider>>> CreateSlider(Slider slider)
    {
        await _unitOfWork.Sliders.AddAsync(slider);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<Slider>.Success(slider));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("sliders/{id}")]
    public async Task<ActionResult<ApiResponse<string>>> UpdateSlider(int id, Slider slider)
    {
        if (id != slider.Id) return BadRequest();
        await _unitOfWork.Sliders.UpdateAsync(slider);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<string>.Success("Slider updated"));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("sliders/{id}")]
    public async Task<ActionResult<ApiResponse<string>>> DeleteSlider(int id)
    {
        var slider = await _unitOfWork.Sliders.GetByIdAsync(id);
        if (slider == null) return NotFound();
        await _unitOfWork.Sliders.DeleteAsync(slider);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<string>.Success("Slider deleted"));
    }

    // STATIC PAGES
    [HttpGet("staticpages/{slug}")]
    public async Task<ActionResult<ApiResponse<StaticPage>>> GetPage(string slug)
    {
        var pages = await _unitOfWork.StaticPages.GetAsync(p => p.Slug == slug && p.IsActive);
        var page = pages.FirstOrDefault();
        if (page == null) return NotFound();
        return Ok(ApiResponse<StaticPage>.Success(page));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("staticpages")]
    public async Task<ActionResult<ApiResponse<StaticPage>>> CreatePage(StaticPage page)
    {
        await _unitOfWork.StaticPages.AddAsync(page);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<StaticPage>.Success(page));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("staticpages/{id}")]
    public async Task<ActionResult<ApiResponse<string>>> UpdatePage(int id, StaticPage page)
    {
        if (id != page.Id) return BadRequest();
        await _unitOfWork.StaticPages.UpdateAsync(page);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<string>.Success("Page updated"));
    }

    // BRANDS
    [HttpGet("brands")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<BrandDto>>>> GetBrands()
    {
        var brands = await _unitOfWork.Brands.GetAllAsync();
        return Ok(ApiResponse<IReadOnlyList<BrandDto>>.Success(_mapper.Map<IReadOnlyList<BrandDto>>(brands)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("brands")]
    public async Task<ActionResult<ApiResponse<BrandDto>>> CreateBrand(Brand brand)
    {
        await _unitOfWork.Brands.AddAsync(brand);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<BrandDto>.Success(_mapper.Map<BrandDto>(brand)));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("brands/{id}")]
    public async Task<ActionResult<ApiResponse<string>>> DeleteBrand(int id)
    {
        var brand = await _unitOfWork.Brands.GetByIdAsync(id);
        if (brand == null) return NotFound();
        await _unitOfWork.Brands.DeleteAsync(brand);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<string>.Success("Brand deleted"));
    }

    // COMBO OFFERS
    [HttpGet("combooffers")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ComboOfferDto>>>> GetComboOffers()
    {
        var offers = await _unitOfWork.ComboOffers.GetAsync(o => o.IsActive && o.EndDate > DateTime.UtcNow);
        return Ok(ApiResponse<IReadOnlyList<ComboOfferDto>>.Success(_mapper.Map<IReadOnlyList<ComboOfferDto>>(offers)));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("combooffers")]
    public async Task<ActionResult<ApiResponse<ComboOfferDto>>> CreateComboOffer(ComboOffer offer)
    {
        await _unitOfWork.ComboOffers.AddAsync(offer);
        await _unitOfWork.SaveAsync();
        return Ok(ApiResponse<ComboOfferDto>.Success(_mapper.Map<ComboOfferDto>(offer)));
    }
}
