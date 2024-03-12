using Microsoft.AspNetCore.Mvc;
using Server.Models.ShoppingCart;
using Server.Services.Ordering.ShoppingCart;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly ICartItemService _cartItemService;


        public CartController(ICartService cartService, ICartItemService cartItemService)
        {
            _cartService = cartService;
            _cartItemService = cartItemService;
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

        [HttpPost]
        public async Task<ActionResult<Cart>> CreateCart(Cart cart)
        {
            var createdCart = await _cartService.CreateCartAsync(cart);
            return CreatedAtAction(nameof(GetCartById), new { id = createdCart.CartId }, createdCart);
        }

        [HttpPost("{cartId}/add-items")]
        public async Task<IActionResult> AddItemsToCart(int cartId, ICollection<CartItem> cartItems)
        {
            var cart = await _cartService.GetCartByIdAsync(cartId);
            if (cart == null)
                return NotFound("Cart not found");

            foreach (var item in cartItems)
            {
                // Beállítjuk a CartId-t a megfelelő értékre
                item.CartId = cartId;
                await _cartItemService.CreateCartItemAsync(item);
            }

            return Ok("Items added to cart successfully");
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
    }
}
