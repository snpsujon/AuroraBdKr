using Aurora.Domain.Entities;

namespace Aurora.Application.Interfaces.Repositories;

public interface IWishlistRepository : IGenericRepository<Wishlist>
{
    Task<IReadOnlyList<Wishlist>> GetWishlistByUserIdAsync(string userId);
    Task<Wishlist?> GetUserWishlistItemAsync(string userId, int productId);
}
