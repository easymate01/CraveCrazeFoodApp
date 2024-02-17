using Server.DTOs;
using Server.Models;

namespace Server.Services
{
    public interface IRestaurant
    {
        Task<List<Restaurant>> GetAllAsync();
        Task<Restaurant> GetByIdAsync(int id);
        Task<Restaurant> CreateAsync(RestaurantDto restaurantDto);
        Task<bool> UpdateAsync(int id, RestaurantDto restaurantDto);
        Task<bool> DeleteAsync(int id);
    }
}
