using Aurora.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        builder => builder.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

builder.Services.AddDbContext<AuroraDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AuroraConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

// Apply migrations and seed data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AuroraDbContext>();
        context.Database.Migrate();
        
        if (!context.Products.Any())
        {
            context.Products.AddRange(
                new Aurora.Core.Entities.Product
                {
                    Name = "Glow Silk Serum",
                    Description = "Advanced radiating serum with Vitamin C and Hyaluronic Acid.",
                    Price = 45.00m,
                    Category = "Serums",
                    StockQuantity = 100,
                    ImageUrl = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400"
                },
                new Aurora.Core.Entities.Product
                {
                    Name = "Ocean Breeze Cleanser",
                    Description = "Gentle foaming cleanser with sea minerals.",
                    Price = 28.00m,
                    Category = "Cleansers",
                    StockQuantity = 150,
                    ImageUrl = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400"
                },
                new Aurora.Core.Entities.Product
                {
                    Name = "Midnight Renewal Cream",
                    Description = "Deep hydrating night cream with retinol.",
                    Price = 55.00m,
                    Category = "Moisturizers",
                    StockQuantity = 80,
                    ImageUrl = "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=400"
                }
            );
            context.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
    }
}

app.Run();
