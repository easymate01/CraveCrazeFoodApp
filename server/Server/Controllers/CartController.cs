﻿using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models.ShoppingCart;
using Server.Services;
using Server.Services.Ordering.ShoppingCart;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly ICartItemService _cartItemService;
        private readonly IDish _dishService;
        private readonly IUser _userService;
        private readonly DataContext _dbContext;

        public CartController(ICartService cartService, ICartItemService cartItemService, IDish dishService, IUser userService, DataContext dataContext)
        {
            _cartService = cartService;
            _cartItemService = cartItemService;
            _dishService = dishService;
            _userService = userService;
            _dbContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cart>>> GetAllCarts()
        {
            var carts = await _cartService.GetAllCartsAsync();
            return Ok(carts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCartById(int id)
        {
            var cart = await _cartService.GetCartByIdAsync(id);
            if (cart == null)
                return NotFound();

            return Ok(cart);
        }

        [HttpGet("identityUser/{IdentityUserId}")]
        public async Task<ActionResult<Cart>> GetCartByUserId(string IdentityUserId)
        {
            var cart = await _cartService.GetCartByIdentityUserId(IdentityUserId);
            if (cart == null)
                return NotFound();

            return Ok(cart);
        }

        [HttpPost("{identityUserId}/add-item")]
        public async Task<ActionResult<Cart>> AddItemToCart(string identityUserId, CartItemDto cartItem)
        {

            var customer = await _userService.GetCustomerByIdentityUserIdAsync(identityUserId);
            if (customer == null)
            {
                return BadRequest($"Customer not found for identity user ID {identityUserId}");
            }
            var cart = await _cartService.GetCartByUserId(customer.Id);

            if (cart == null)
            {
                cart = new Cart();
                await _cartService.CreateCartAsync(cart);


                customer.CartId = cart.CartId;
                await _dbContext.SaveChangesAsync();
            }

            var dish = await _dishService.GetByIdAsync(cartItem.DishId);
            if (dish == null)
            {
                // Kezeljük a hibát, ha a megadott étel nem található
                return BadRequest($"Dish with ID {cartItem.DishId} not found");
            }

            var cartItemEntity = new CartItem()
            {
                CartId = cart.CartId,
                DishId = cartItem.DishId,
                Dish = dish,
                Quantity = cartItem.Quantity,
            };

            await _cartItemService.CreateCartItemAsync(cartItemEntity);

            return Ok(cart);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCart(int id, Cart cart)
        {
            var result = await _cartService.UpdateCartAsync(id, cart);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var result = await _cartService.DeleteCartAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}/empty")]
        public async Task<IActionResult> EmptyCart(int id)
        {
            try
            {
                var result = await _cartItemService.DeleteAllItemsInCartAsync(id);
                if (!result)
                    return NotFound($"An error occurred while deleting items from cart {id}.");

                return Ok($"Cart with id: {id} is empty.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }
    }
}
