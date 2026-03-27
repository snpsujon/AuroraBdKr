using Aurora.Domain.Entities;

namespace Aurora.Application.Interfaces.Repositories;

public interface IProductRepository : IGenericRepository<Product>
{
    Task<(IReadOnlyList<Product> Items, int TotalCount)> GetPagedProductsAsync(
        int pageIndex, int pageSize, string? search, int? categoryId, int? brandId, string? sortBy);
    Task<Product?> GetBySlugAsync(string slug);
    Task<IReadOnlyList<Product>> GetFeaturedProductsAsync(int count);
    Task<IReadOnlyList<Product>> GetTrendingProductsAsync(int count);
    Task<IReadOnlyList<Product>> GetBestSellingProductsAsync(int count);
    Task<IReadOnlyList<Product>> GetByCategorySlugAsync(string slug);
    Task<IReadOnlyList<Product>> GetByBrandSlugAsync(string slug);
}
