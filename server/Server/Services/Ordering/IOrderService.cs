using Server.DTOs;
using Server.Models;

namespace Server.Services.Ordering
{
    public interface IOrderService
    {
        Task<List<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task<Order> CreateOrderAsync(OrderDto order);
        Task<bool> UpdateOrderAsync(int id, Order order);
        Task<bool> DeleteOrderAsync(int id);
    }
}
