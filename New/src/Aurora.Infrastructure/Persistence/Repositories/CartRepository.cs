using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Aurora.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Aurora.Infrastructure.Persistence.Repositories;

public class CartRepository : GenericRepository<CartItem>, ICartRepository
{
    public CartRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<CartItem>> GetCartByUserIdAsync(string userId)
    {
        return await _context.CartItems
            .Include(x => x.Product)
            .Include(x => x.ProductVariant)
            .Where(x => x.UserId == userId)
            .ToListAsync();
    }

    public async Task<CartItem?> GetUserCartItemAsync(string userId, int productId, int? variantId)
    {
        return await _context.CartItems
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ProductId == productId && x.ProductVariantId == variantId);
    }
}
