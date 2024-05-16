using Microsoft.EntityFrameworkCore;
using Server.Models.ShoppingCart;
using Server.Services.Ordering.ShoppingCart;

namespace Server.Services
{
    public class CartItemService : ICartItemService
    {
        private readonly DataContext _dbContext;

        public CartItemService(DataContext context)
        {
            _dbContext = context;
        }

        public async Task<List<CartItem>> GetAllCartItemsAsync()
        {
            return await _dbContext.CartItems
                .Include(item => item.Dish)
                .ToListAsync();
        }

        public async Task<CartItem> GetCartItemByIdAsync(int id)
        {
            return await _dbContext.CartItems
                .Include(item => item.Dish)
                .FirstOrDefaultAsync(item => item.CartItemId == id);
        }
        public async Task<List<CartItem>> GetCartItemsByCartIdAsync(int cartId)
        {
            return await _dbContext.CartItems
                .Where(ci => ci.CartId == cartId)
                .ToListAsync();
        }

        public Task<bool> DeleteAllItemsInCartAsync(int cartId)
        {
            throw new NotImplementedException();
        }

        public async Task<CartItem> CreateCartItemAsync(CartItem cartItem)
        {
            _dbContext.CartItems.Add(cartItem);
            await _dbContext.SaveChangesAsync();
            return cartItem;
        }

        public async Task<bool> UpdateCartItemAsync(int id, CartItem cartItem)
        {
            var existingCartItem = await _dbContext.CartItems.FindAsync(id);
            if (existingCartItem == null)
                return false;

            existingCartItem.DishId = cartItem.DishId;
            existingCartItem.Quantity = cartItem.Quantity;

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCartItemAsync(int id)
        {
            var existingCartItem = await _dbContext.CartItems.FindAsync(id);
            if (existingCartItem == null)
                return false;

            _dbContext.CartItems.Remove(existingCartItem);
            await _dbContext.SaveChangesAsync();
            return true;
        }

    }
}