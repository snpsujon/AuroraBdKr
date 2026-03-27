using Aurora.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Aurora.Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<ProductTag> ProductTags => Set<ProductTag>();
    public DbSet<ProductVariant> ProductVariants => Set<ProductVariant>();
    public DbSet<ComboOffer> ComboOffers => Set<ComboOffer>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Wishlist> Wishlists => Set<Wishlist>();
    public DbSet<StaticPage> StaticPages => Set<StaticPage>();
    public DbSet<Slider> Sliders => Set<Slider>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Product Configuration
        builder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
            entity.Property(p => p.DiscountPrice).HasColumnType("decimal(18,2)");
            
            entity.HasOne(p => p.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(p => p.CategoryId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(p => p.Brand)
                  .WithMany(b => b.Products)
                  .HasForeignKey(p => p.BrandId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Category Configuration (Self-referencing)
        builder.Entity<Category>(entity =>
        {
            entity.HasOne(c => c.ParentCategory)
                  .WithMany(c => c.SubCategories)
                  .HasForeignKey(c => c.ParentCategoryId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // ProductVariant Configuration
        builder.Entity<ProductVariant>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)");

        // Order Configuration
        builder.Entity<Order>(entity =>
        {
            entity.Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
        });

        // OrderItem Configuration
        builder.Entity<OrderItem>(entity =>
        {
            entity.Property(o => o.UnitPrice).HasColumnType("decimal(18,2)");
        });

        // ComboOffer Configuration
        builder.Entity<ComboOffer>()
            .Property(c => c.DiscountPercentage)
            .HasColumnType("decimal(18,2)");
    }
}
