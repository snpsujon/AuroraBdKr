using Aurora.Application.DTOs.Product;

namespace Aurora.Application.DTOs.Cart;

public class CartItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string ProductThumbnail { get; set; } = string.Empty;
    public int? ProductVariantId { get; set; }
    public string? VariantInfo { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice => UnitPrice * Quantity;
}

public class CartDto
{
    public List<CartItemDto> Items { get; set; } = new();
    public decimal SubTotal => Items.Sum(x => x.TotalPrice);
    public decimal Discount { get; set; } // Could be extended with coupons later
    public decimal Total => SubTotal - Discount;
}

public class AddToCartDto
{
    public int ProductId { get; set; }
    public int? ProductVariantId { get; set; }
    public int Quantity { get; set; }
}

public class UpdateCartItemDto
{
    public int CartItemId { get; set; }
    public int Quantity { get; set; }
}
