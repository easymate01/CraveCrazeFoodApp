using Microsoft.EntityFrameworkCore;
using Server.Models;

public class DataContext : DbContext
{
    public DbSet<Dish> Dishes;
    public DbSet<Restaurant> Restaurants;
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=localhost,1433;Database=WeatherApi;User Id=sa;Password=yourStrong(!)Password;Encrypt=false;");
    }
}