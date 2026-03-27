using Aurora.Domain.Common;

namespace Aurora.Domain.Entities;

public class StaticPage : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
