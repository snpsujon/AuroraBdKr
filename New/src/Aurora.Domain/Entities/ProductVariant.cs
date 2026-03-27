using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class ProductVariant : BaseEntity
{
    public string? Size { get; set; }
    public string? Color { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public int ProductId { get; set; }
    public virtual Product Product { get; set; } = null!;
}
