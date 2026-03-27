using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Aurora.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Aurora.Infrastructure.Persistence.Repositories;

public class ReviewRepository : GenericRepository<Review>, IReviewRepository
{
    public ReviewRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Review>> GetApprovedReviewsByProductIdAsync(int productId)
    {
        return await _context.Reviews
            .Where(r => r.ProductId == productId && r.IsApproved)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }
}
