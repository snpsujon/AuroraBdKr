using Aurora.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Aurora.Infrastructure.Data;

public class AuroraDbContext : DbContext
{
    public AuroraDbContext(DbContextOptions<AuroraDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Seed some data or configure entities if needed
        modelBuilder.Entity<Product>().Property(p => p.Price).HasPrecision(18, 2);
    }
}
