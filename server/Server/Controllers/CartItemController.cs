using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models.ShoppingCart;
using Server.Services.Ordering.ShoppingCart;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemService _cartItemService;

        public CartItemController(ICartItemService cartItemService)
        {
            _cartItemService = cartItemService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CartItem>>> GetAllCartItems()
        {
            var cartItems = await _cartItemService.GetAllCartItemsAsync();
            return Ok(cartItems);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItemById(int id)
        {
            var cartItem = await _cartItemService.GetCartItemByIdAsync(id);
            if (cartItem == null)
                return NotFound();

            return Ok(cartItem);
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> CreateCartItem(CartItemDto cartItem)
        {
            var createdCartItem = await _cartItemService.CreateCartItemAsync(cartItem);
            return CreatedAtAction(nameof(GetCartItemById), new { id = createdCartItem.CartItemId }, createdCartItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, CartItem cartItem)
        {
            var result = await _cartItemService.UpdateCartItemAsync(id, cartItem);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var result = await _cartItemService.DeleteCartItemAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
