using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class OrderItem : BaseEntity
{
    public int OrderId { get; set; }
    public virtual Order Order { get; set; } = null!;
    public int ProductId { get; set; }
    public virtual Product Product { get; set; } = null!;
    public int? ProductVariantId { get; set; }
    public virtual ProductVariant? ProductVariant { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}
