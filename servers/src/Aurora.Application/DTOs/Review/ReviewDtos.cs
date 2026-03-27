namespace Aurora.Application.DTOs.Review;

public class ReviewDto
{
    public int Id { get; set; }
    public string UserFullName { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ReviewCreateDto
{
    public int ProductId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
}
