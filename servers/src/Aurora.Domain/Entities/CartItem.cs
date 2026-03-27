using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class CartItem : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public int ProductId { get; set; }
    public virtual Product Product { get; set; } = null!;
    public int? ProductVariantId { get; set; }
    public virtual ProductVariant? ProductVariant { get; set; }
    public int Quantity { get; set; }
}
