using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? LongDescription { get; set; }
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public int StockQuantity { get; set; }
    public string SKU { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    
    public bool IsFeatured { get; set; }
    public bool IsTrending { get; set; }
    public int TotalSales { get; set; }

    public int CategoryId { get; set; }
    public virtual Category Category { get; set; } = null!;
    
    public int? BrandId { get; set; }
    public virtual Brand? Brand { get; set; }

    public virtual ICollection<ProductImage> Images { get; set; } = new HashSet<ProductImage>();
    public virtual ICollection<ProductTag> Tags { get; set; } = new HashSet<ProductTag>();
    public virtual ICollection<ProductVariant> Variants { get; set; } = new HashSet<ProductVariant>();
    public virtual ICollection<Review> Reviews { get; set; } = new HashSet<Review>();
}
