using Aurora.Domain.Entities;

namespace Aurora.Application.Interfaces.Repositories;

public interface IReviewRepository : IGenericRepository<Review>
{
    Task<IReadOnlyList<Review>> GetApprovedReviewsByProductIdAsync(int productId);
}
