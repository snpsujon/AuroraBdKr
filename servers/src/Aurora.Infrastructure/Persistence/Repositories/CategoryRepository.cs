using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Aurora.Infrastructure.Persistence;

namespace Aurora.Infrastructure.Persistence.Repositories;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context)
    {
    }
}
