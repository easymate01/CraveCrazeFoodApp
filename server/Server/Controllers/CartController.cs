using Microsoft.AspNetCore.Mvc;
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



        public CartController(ICartService cartService, ICartItemService cartItemService, IDish dishService)
        {
            _cartService = cartService;
            _cartItemService = cartItemService;
            _dishService = dishService;
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

        [HttpPost("{userId}/add-items")]
        public async Task<IActionResult> AddItemsToCart(int userId, ICollection<CartItemDto> cartItems)
        {
            var cart = await _cartService.GetCartByIdAsync(userId);
            if (cart == null)
            {
                cart = new Cart();
                await _cartService.CreateCartAsync(cart);
            }

            foreach (var itemDto in cartItems)
            {
                var dish = await _dishService.GetByIdAsync(itemDto.DishId);
                if (dish == null)
                {
                    // Kezeljük a hibát, ha a megadott étel nem található
                    return BadRequest($"Dish with ID {itemDto.DishId} not found");
                }

                var cartItem = new CartItem()
                {
                    CartId = cart.CartId,
                    DishId = itemDto.DishId,
                    Dish = dish,
                    Quantity = itemDto.Quantity,
                };

                await _cartItemService.CreateCartItemAsync(cartItem);
            }

            // Ha minden sikeres volt, beállítjuk a CartItems-t a Cart-hoz
            cart.CartItems = await _cartItemService.GetCartItemsByCartIdAsync(cart.CartId);

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
