using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class Review : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public string UserFullName { get; set; } = string.Empty;
    public int ProductId { get; set; }
    public virtual Product Product { get; set; } = null!;
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public bool IsApproved { get; set; } = false;
}
