using Server.DTOs;
using Server.Models;

namespace Server.Services
{
    public class RestaurantService : IRestaurant
    {
        private readonly DataContext _dbContext;

        public RestaurantService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Restaurant> CreateAsync(RestaurantDto restaurant)
        {
            var newRestaurant = new Restaurant
            {
                Name = restaurant.Name,
                Image = restaurant.Image,
                Description = restaurant.Description,
                Lng = restaurant.Lng,
                Lat = restaurant.Lat,
                Address = restaurant.Address,
                Stars = restaurant.Stars,
                Reviews = restaurant.Reviews,
                Category = restaurant.Category
            };
            _dbContext.Restaurants.Add(newRestaurant);
            await _dbContext.SaveChangesAsync();
            return newRestaurant;
        }
    }
}
