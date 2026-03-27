using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Aurora.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Aurora.Infrastructure.Persistence.Repositories;

public class ProductRepository : GenericRepository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<(IReadOnlyList<Product> Items, int TotalCount)> GetPagedProductsAsync(
        int pageIndex, int pageSize, string? search, int? categoryId, int? brandId, string? sortBy)
    {
        var query = _context.Products
            .Include(p => p.Category)
            .Include(p => p.Brand)
            .Include(p => p.Reviews)
            .AsQueryable();

        // Filtering
        if (!string.IsNullOrEmpty(search))
            query = query.Where(p => p.Name.Contains(search) || p.Description.Contains(search));

        if (categoryId.HasValue)
            query = query.Where(p => p.CategoryId == categoryId);

        if (brandId.HasValue)
            query = query.Where(p => p.BrandId == brandId);

        // Sorting
        query = sortBy switch
        {
            "priceAsc" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            "nameDesc" => query.OrderByDescending(p => p.Name),
            _ => query.OrderBy(p => p.Name)
        };

        var totalCount = await query.CountAsync();
        var items = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();

        return (items, totalCount);
    }

    public async Task<Product?> GetBySlugAsync(string slug)
    {
        return await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Brand)
            .Include(p => p.Images)
            .Include(p => p.Tags)
            .Include(p => p.Variants)
            .Include(p => p.Reviews)
            .FirstOrDefaultAsync(p => p.Slug == slug);
    }

    public async Task<IReadOnlyList<Product>> GetFeaturedProductsAsync(int count)
    {
        return await _context.Products
            .Where(p => p.IsFeatured)
            .Include(p => p.Category)
            .Include(p => p.Reviews)
            .Take(count)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Product>> GetTrendingProductsAsync(int count)
    {
        return await _context.Products
            .Where(p => p.IsTrending)
            .Include(p => p.Category)
            .Include(p => p.Reviews)
            .Take(count)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Product>> GetBestSellingProductsAsync(int count)
    {
        return await _context.Products
            .OrderByDescending(p => p.TotalSales)
            .Include(p => p.Category)
            .Include(p => p.Reviews)
            .Take(count)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Product>> GetByCategorySlugAsync(string slug)
    {
        return await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Reviews)
            .Where(p => p.Category.Slug == slug)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Product>> GetByBrandSlugAsync(string slug)
    {
        return await _context.Products
            .Include(p => p.Brand)
            .Include(p => p.Reviews)
            .Where(p => p.Brand!.Slug == slug)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Product>> GetProductsByCategoryAsync(int categoryId)
    {
        return await _context.Products
            .Where(p => p.CategoryId == categoryId)
            .ToListAsync();
    }
}
