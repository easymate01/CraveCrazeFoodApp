﻿using Server.Models.ShoppingCart;

namespace Server.Services.Ordering.ShoppingCart
{
    public interface ICartService
    {
        Task<List<Cart>> GetAllCartsAsync();
        Task<Cart> GetCartByIdAsync(int id);
        Task<Cart> GetCartByUserId(string id);
        Task<Cart> CreateCartAsync(Cart cart);
        Task<bool> UpdateCartAsync(int id, Cart cart);
        Task<bool> DeleteCartAsync(int id);
        Task<Cart> GetCartByIdentityUserId(string identityUserId);
    }
}
