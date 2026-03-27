using AutoMapper;
using Aurora.Application.DTOs.Product;
using Aurora.Application.DTOs.CMS;
using Aurora.Domain.Entities;

namespace Aurora.Application.Common.Mappings;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>()
            .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category.Name))
            .ForMember(d => d.BrandName, opt => opt.MapFrom(s => s.Brand != null ? s.Brand.Name : string.Empty))
            .ForMember(d => d.AverageRating, opt => opt.MapFrom(s => s.Reviews.Any() ? s.Reviews.Average(r => r.Rating) : 0))
            .ForMember(d => d.ReviewCount, opt => opt.MapFrom(s => s.Reviews.Count));

        CreateMap<ProductCreateDto, Product>();
        
        CreateMap<Brand, BrandDto>();
        CreateMap<ComboOffer, ComboOfferDto>();
    }
}
