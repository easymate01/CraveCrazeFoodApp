using Server.Models.ShoppingCart;

namespace Server.Services.Ordering.ShoppingCart
{
    public interface ICartItemService
    {
        Task<List<CartItem>> GetAllCartItemsAsync();
        Task<CartItem> GetCartItemByIdAsync(int id);
        Task<CartItem> CreateCartItemAsync(CartItem cartItem);
        Task<bool> UpdateCartItemAsync(int id, CartItem cartItem);
        Task<bool> DeleteCartItemAsync(int id);
        Task<List<CartItem>> GetCartItemsByCartIdAsync(int cartId);
    }
}
