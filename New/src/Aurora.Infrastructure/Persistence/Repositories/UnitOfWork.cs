using Aurora.Application.Interfaces.Repositories;
using Aurora.Domain.Entities;
using Aurora.Infrastructure.Persistence;

namespace Aurora.Infrastructure.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IProductRepository? _products;
    private ICategoryRepository? _categories;
    private ICartRepository? _carts;
    private IOrderRepository? _orders;
    private IReviewRepository? _reviews;
    private IWishlistRepository? _wishlists;
    private IGenericRepository<Brand>? _brands;
    private IGenericRepository<Slider>? _sliders;
    private IGenericRepository<StaticPage>? _staticPages;
    private IGenericRepository<ComboOffer>? _comboOffers;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public IProductRepository Products => _products ??= new ProductRepository(_context);
    public ICategoryRepository Categories => _categories ??= new CategoryRepository(_context);
    public ICartRepository Carts => _carts ??= new CartRepository(_context);
    public IOrderRepository Orders => _orders ??= new OrderRepository(_context);
    public IReviewRepository Reviews => _reviews ??= new ReviewRepository(_context);
    public IWishlistRepository Wishlists => _wishlists ??= new WishlistRepository(_context);
    public IGenericRepository<Brand> Brands => _brands ??= new GenericRepository<Brand>(_context);
    public IGenericRepository<Slider> Sliders => _sliders ??= new GenericRepository<Slider>(_context);
    public IGenericRepository<StaticPage> StaticPages => _staticPages ??= new GenericRepository<StaticPage>(_context);
    public IGenericRepository<ComboOffer> ComboOffers => _comboOffers ??= new GenericRepository<ComboOffer>(_context);

    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}
