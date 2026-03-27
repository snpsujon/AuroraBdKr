using Aurora.Application.DTOs.Product;

namespace Aurora.Application.DTOs.Wishlist;

public class WishlistDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public ProductDto Product { get; set; } = null!;
}

public class WishlistCreateDto
{
    public int ProductId { get; set; }
}
