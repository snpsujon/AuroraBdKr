using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class Brand : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? LogoUrl { get; set; }
    public virtual ICollection<Product> Products { get; set; } = new HashSet<Product>();
}
