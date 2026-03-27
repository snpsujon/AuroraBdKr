namespace Aurora.Application.DTOs.Order;

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice => Quantity * UnitPrice;
}

public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string? TrackingNumber { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = new();
}

public class OrderCreateDto
{
    public string ShippingAddress { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = "CreditCard"; // Placeholder for payment integration
}

public class OrderStatusUpdateDto
{
    public string Status { get; set; } = string.Empty;
    public string? TrackingNumber { get; set; }
}
