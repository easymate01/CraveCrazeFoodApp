using Microsoft.EntityFrameworkCore;
using Server.Models.ShoppingCart;

namespace Server.Services.Ordering.ShoppingCart
{
    public class CartService : ICartService
    {
        private readonly DataContext _dbContext;

        public CartService(DataContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Cart>> GetAllCartsAsync()
        {
            return await _dbContext.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Dish)
                .ToListAsync();
        }

        public async Task<Cart> GetCartByIdAsync(int id)
        {
            return await _dbContext.Carts.FindAsync(id);
        }

        public async Task<Cart> GetCartByUserId(string id)
        {
            // Find the customer by their ID
            var customer = await _dbContext.Customers.FindAsync(id);

            if (customer != null)
            {
                // Retrieve the cart associated with the customer
                var cart = _dbContext.Carts.FirstOrDefault(c => c.CartId == customer.CartId);
                return cart;
            }

            return null;
        }

        public async Task<Cart> CreateCartAsync(Cart cart)
        {
            _dbContext.Carts.Add(cart);
            await _dbContext.SaveChangesAsync();
            return cart;
        }

        public async Task<bool> UpdateCartAsync(int id, Cart cart)
        {
            var existingCart = await _dbContext.Carts.FindAsync(id);
            if (existingCart == null)
                return false;

            existingCart.CartItems = cart.CartItems;
            // További mezők frissítése, ha szükséges

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCartAsync(int id)
        {
            var existingCart = await _dbContext.Carts.FindAsync(id);
            if (existingCart == null)
                return false;

            _dbContext.Carts.Remove(existingCart);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<Cart> GetCartByIdentityUserId(string identityUserId)
        {
            var user = await _dbContext.Customers.FirstOrDefaultAsync(c => c.IdentityUserId == identityUserId);
            if (user == null)
                return null;

            var cart = await _dbContext.Carts.Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.CartId == user.CartId);

            return cart;
        }

    }
}
