using Aurora.Domain.Entities;

namespace Aurora.Application.Interfaces.Repositories;

public interface IOrderRepository : IGenericRepository<Order>
{
    Task<IReadOnlyList<Order>> GetOrdersByUserIdAsync(string userId);
    Task<Order?> GetOrderByIdWithItemsAsync(int id);
    Task<IReadOnlyList<Order>> GetAllOrdersWithItemsAsync();
}
