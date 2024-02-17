using Server.DTOs;
using Server.Models;

namespace Server.Services
{
    public interface IRestaurant
    {
        Task<Restaurant> CreateAsync(RestaurantDto product);
    }
}
