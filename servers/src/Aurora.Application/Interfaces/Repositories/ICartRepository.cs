using Aurora.Domain.Entities;

namespace Aurora.Application.Interfaces.Repositories;

public interface ICartRepository : IGenericRepository<CartItem>
{
    Task<IReadOnlyList<CartItem>> GetCartByUserIdAsync(string userId);
    Task<CartItem?> GetUserCartItemAsync(string userId, int productId, int? variantId);
}
