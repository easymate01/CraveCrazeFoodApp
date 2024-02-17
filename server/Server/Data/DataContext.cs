using Microsoft.EntityFrameworkCore;
using Server.Models;

public class DataContext : DbContext
{
    public DbSet<Dish> Dishes { get; set; }
    public DbSet<Restaurant> Restaurants { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=localhost,1433;Database=CraveCrase;User Id=sa;Password=yourStrong(!)Password;Encrypt=false;Encrypt=True;TrustServerCertificate=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Restaurant>().HasData(
            new Restaurant
            {
                Id = 1,
                Name = "Papa Johns",
                Image = "../assets/images/pizza.png",
                Description = "Hot and spicy pizzas",
                Lng = -85.5324269,
                Lat = 38.2145602,
                Address = "434 second street",
                Stars = 4,
                Reviews = "4.4k",
                Category = "Fast Food"
            }
        );

        // Seed the Dish data associated with the Restaurant
        modelBuilder.Entity<Dish>().HasData(
            new Dish { Id = 1, RestaurantId = 1, Name = "Pizza", Description = "Cheezy garlic pizza", Price = 10, Image = "../assets/images/pizzaDish.png" },
            new Dish { Id = 2, RestaurantId = 1, Name = "Pizza", Description = "Cheezy garlic pizza", Price = 10, Image = "../assets/images/pizzaDish.png" },
            new Dish { Id = 3, RestaurantId = 1, Name = "Pizza", Description = "Cheezy garlic pizza", Price = 10, Image = "../assets/images/pizzaDish.png" }
        );
    }



}