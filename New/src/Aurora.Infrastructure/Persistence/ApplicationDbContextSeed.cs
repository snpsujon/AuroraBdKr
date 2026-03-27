using Aurora.Domain.Entities;
using Aurora.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Aurora.Infrastructure.Persistence;

public static class ApplicationDbContextSeed
{
    public static async Task SeedAsync(ApplicationDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        // Default roles
        if (!roleManager.Roles.Any())
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.Admin.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Roles.Customer.ToString()));
        }

        // Default users
        if (!userManager.Users.Any())
        {
            var adminUser = new IdentityUser { UserName = "admin@aurora.com", Email = "admin@aurora.com", EmailConfirmed = true };
            await userManager.CreateAsync(adminUser, "Password123!");
            await userManager.AddToRoleAsync(adminUser, Roles.Admin.ToString());

            var customerUser = new IdentityUser { UserName = "customer@aurora.com", Email = "customer@aurora.com", EmailConfirmed = true };
            await userManager.CreateAsync(customerUser, "Password123!");
            await userManager.AddToRoleAsync(customerUser, Roles.Customer.ToString());
        }

        // Brands
        if (!context.Brands.Any())
        {
            var brands = new List<Brand>
            {
                new Brand { Name = "Glow Recipe", Slug = "glow-recipe", Description = "Fruit-powered skincare" },
                new Brand { Name = "The Ordinary", Slug = "the-ordinary", Description = "Clinical formulations with integrity" },
                new Brand { Name = "La Roche-Posay", Slug = "la-roche-posay", Description = "Dermatologist recommended" }
            };
            await context.Brands.AddRangeAsync(brands);
            await context.SaveChangesAsync();
        }

        // Categories
        if (!context.Categories.Any())
        {
            var categories = new List<Category>
            {
                new Category { Name = "Cleansers", Slug = "cleansers", Description = "Gentle cleansers for all skin types" },
                new Category { Name = "Moisturizers", Slug = "moisturizers", Description = "Hydrating creams and lotions" },
                new Category { Name = "Serums", Slug = "serums", Description = "Targeted treatments for specific concerns" }
            };

            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();

            // Products
            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product { 
                        Name = "Gentle Foam Cleanser", 
                        Slug = "gentle-foam-cleanser",
                        Description = "A soap-free foaming cleanser", 
                        Price = 25.00m, 
                        CategoryId = categories[0].Id, 
                        BrandId = context.Brands.First(b => b.Slug == "la-roche-posay").Id,
                        ThumbnailUrl = "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400", 
                        SKU = "SKU001",
                        IsFeatured = true,
                        StockQuantity = 100
                    },
                    new Product { 
                        Name = "Hyaluronic Acid Serum", 
                        Slug = "hyaluronic-acid-serum",
                        Description = "Deeply hydrating serum", 
                        Price = 45.00m, 
                        CategoryId = categories[2].Id, 
                        BrandId = context.Brands.First(b => b.Slug == "the-ordinary").Id,
                        ThumbnailUrl = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400", 
                        SKU = "SKU002",
                        IsTrending = true,
                        DiscountPrice = 40.00m,
                        StockQuantity = 50
                    },
                    new Product { 
                        Name = "Watermelon Glow Pink Juice", 
                        Slug = "watermelon-glow",
                        Description = "Oil-free moisturizer", 
                        Price = 38.00m, 
                        CategoryId = categories[1].Id, 
                        BrandId = context.Brands.First(b => b.Slug == "glow-recipe").Id,
                        ThumbnailUrl = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400", 
                        SKU = "SKU003",
                        TotalSales = 150,
                        StockQuantity = 75
                    }
                };

                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
            }
        }

        // Sliders
        if (!context.Sliders.Any())
        {
            var sliders = new List<Slider>
            {
                new Slider 
                { 
                    Title = "Summer Glow Collection", 
                    SubTitle = "Get up to 30% off on all serums", 
                    ImageUrl = "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200", 
                    LinkUrl = "/shop/serums", 
                    DisplayOrder = 1, 
                    IsActive = true 
                },
                new Slider 
                { 
                    Title = "New Arrival: Watermelon Mist", 
                    SubTitle = "Hydration on the go", 
                    ImageUrl = "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200", 
                    LinkUrl = "/product/watermelon-mist", 
                    DisplayOrder = 2, 
                    IsActive = true 
                }
            };
            await context.Sliders.AddRangeAsync(sliders);
            await context.SaveChangesAsync();
        }

        // Static Pages
        if (!context.StaticPages.Any())
        {
            var pages = new List<StaticPage>
            {
                new StaticPage { Title = "About Aurora", Slug = "about-us", Content = "Aurora is your premium destination for high-end skincare...", IsActive = true },
                new StaticPage { Title = "Privacy Policy", Slug = "privacy-policy", Content = "Your privacy is important to us...", IsActive = true }
            };
            await context.StaticPages.AddRangeAsync(pages);
            await context.SaveChangesAsync();
        }
    }
}
