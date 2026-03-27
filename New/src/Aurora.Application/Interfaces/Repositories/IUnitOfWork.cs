using Aurora.Domain.Entities;

namespace Aurora.Application.Interfaces.Repositories;

public interface IUnitOfWork : IDisposable
{
    IProductRepository Products { get; }
    ICategoryRepository Categories { get; }
    ICartRepository Carts { get; }
    IOrderRepository Orders { get; }
    IReviewRepository Reviews { get; }
    IWishlistRepository Wishlists { get; }
    IGenericRepository<Brand> Brands { get; }
    IGenericRepository<Slider> Sliders { get; }
    IGenericRepository<StaticPage> StaticPages { get; }
    IGenericRepository<ComboOffer> ComboOffers { get; }
    Task<int> SaveAsync();
}
