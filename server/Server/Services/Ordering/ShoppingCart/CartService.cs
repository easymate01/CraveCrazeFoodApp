﻿using Microsoft.EntityFrameworkCore;
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
            return await _dbContext.Carts.ToListAsync();
        }

        public async Task<Cart> GetCartByIdAsync(int id)
        {
            return await _dbContext.Carts.FindAsync(id);
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
    }
}