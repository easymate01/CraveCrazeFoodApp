using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;

namespace Server.Services.Ordering.Repository
{
    public class OrderService : IOrderService
    {
        private readonly DataContext _dbContext;

        private readonly UserService _userService;

        public OrderService(DataContext context, UserService userService)
        {
            _dbContext = context;
            _userService = userService;
        }

        public async Task<List<Order>> GetAllOrdersAsync()
        {
            return await _dbContext.Orders
                .Include(o => o.Cart)
                .ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _dbContext.Orders
                .Include(o => o.Cart)
                .FirstOrDefaultAsync(o => o.OrderId == id);
        }



        public async Task<Order> CreateOrderAsync(OrderDto orderDto)
        {
            var customer = await _userService.GetCustomerByIdentityUserIdAsync(orderDto.IdentityUserId);
            if (orderDto == null)
                throw new ArgumentNullException(nameof(orderDto));


            if (customer == null)
                throw new ArgumentException("Customer not found");

            var restaurant = await _dbContext.Restaurants.FindAsync(orderDto.RestaurantId);

            if (restaurant == null)
                throw new ArgumentException("Restaurant not found");

            var cart = await _dbContext.Carts.FindAsync(orderDto.CartId);

            if (cart == null)
                throw new ArgumentException("Cart not found");

            var order = new Order
            {
                RestaurantId = orderDto.RestaurantId,
                CustomerId = customer.Id,
                CartId = orderDto.CartId,
                Date = DateTime.Now
            };

            order.Customer = customer;
            order.Restaurant = restaurant;
            order.Cart = cart;

            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();

            return order;
        }

        public async Task<bool> UpdateOrderAsync(int id, Order order)
        {
            var existingOrder = await _dbContext.Orders.FindAsync(id);
            if (existingOrder == null)
            {
                return false;
            }

            existingOrder.CustomerId = order.CustomerId;
            existingOrder.RestaurantId = order.RestaurantId;
            existingOrder.Cart = order.Cart;
            existingOrder.Date = order.Date;

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var existingOrder = await _dbContext.Orders.FindAsync(id);
            if (existingOrder == null)
            {
                return false;
            }

            _dbContext.Orders.Remove(existingOrder);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
