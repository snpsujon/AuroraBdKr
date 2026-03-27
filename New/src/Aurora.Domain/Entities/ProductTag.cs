using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class ProductTag : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int ProductId { get; set; }
    public virtual Product Product { get; set; } = null!;
}
