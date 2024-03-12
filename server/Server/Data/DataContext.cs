using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Cart;

public class DataContext : DbContext
{
    public DbSet<Dish> Dishes { get; set; }
    public DbSet<Restaurant> Restaurants { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Order> Orders { get; set; }
    public DbSet<Cart> Carts { get; set; }

    public DbSet<CartItem> CartItems { get; set; }




    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=localhost,1433;Database=Crave_Crase;User Id=sa;Password=yourStrong(!)Password;Encrypt=false;Encrypt=True;TrustServerCertificate=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {


    }



}