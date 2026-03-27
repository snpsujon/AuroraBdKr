using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class ProductImage : BaseEntity
{
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsMain { get; set; }
    public int ProductId { get; set; }
    public virtual Product Product { get; set; } = null!;
}
