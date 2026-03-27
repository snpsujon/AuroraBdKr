using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class Wishlist : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public int ProductId { get; set; }
    public virtual Product Product { get; set; } = null!;
}
