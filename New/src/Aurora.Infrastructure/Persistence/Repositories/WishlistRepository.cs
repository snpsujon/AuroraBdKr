using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Aurora.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Aurora.Infrastructure.Persistence.Repositories;

public class WishlistRepository : GenericRepository<Wishlist>, IWishlistRepository
{
    public WishlistRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Wishlist>> GetWishlistByUserIdAsync(string userId)
    {
        return await _context.Wishlists
            .Include(w => w.Product)
            .ThenInclude(p => p.Category)
            .Where(w => w.UserId == userId)
            .ToListAsync();
    }

    public async Task<Wishlist?> GetUserWishlistItemAsync(string userId, int productId)
    {
        return await _context.Wishlists
            .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);
    }
}
