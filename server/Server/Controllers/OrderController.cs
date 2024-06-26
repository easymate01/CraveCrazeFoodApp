﻿using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Services.Ordering;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            try
            {
                var order = await _orderService.CreateOrderAsync(orderDto);
                return CreatedAtAction(nameof(GetAllOrders), new { id = order.OrderId }, order);
            }
            catch (ArgumentNullException)
            {
                return BadRequest("Order data is missing.");
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, Order order)
        {
            var result = await _orderService.UpdateOrderAsync(id, order);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _orderService.DeleteOrderAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        //[HttpPost("place-order")]
        //public async Task<ActionResult<Order>> PlaceOrder(int customerId, int restaurantId, ICollection<CartItem> cartItems)
        //{
        //    Create the order from the cart items
        //   var order = new Order
        //   {
        //       CustomerId = customerId,
        //       RestaurantId = restaurantId,
        //       Carts = cartItems
        //   };

        //    Save the order
        //   var newOrder = await _orderService.CreateOrderAsync(order);
        //    return CreatedAtAction(nameof(GetOrderById), new { id = newOrder.OrderId }, newOrder);
        //}
    }
}
