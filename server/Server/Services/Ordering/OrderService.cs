using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services.Ordering.Repository
{
    public class OrderService : IOrderService
    {
        private readonly DataContext _dbContext;


        public OrderService(DataContext context)
        {
            _dbContext = context;
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

        public async Task<Order> CreateOrderAsync(Order order)
        {
            order.Date = DateTime.Now;
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
