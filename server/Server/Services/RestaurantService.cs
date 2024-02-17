using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Restaurant>> GetAllAsync()
        {
            return await _dbContext.Restaurants.ToListAsync();
        }

        public async Task<Restaurant> GetByIdAsync(int id)
        {
            return await _dbContext.Restaurants.FindAsync(id);
        }

        public async Task<Restaurant> CreateAsync(RestaurantDto restaurantDto)
        {
            var newRestaurant = new Restaurant
            {
                Name = restaurantDto.Name,
                Image = restaurantDto.Image,
                Description = restaurantDto.Description,
                Lng = restaurantDto.Lng,
                Lat = restaurantDto.Lat,
                Address = restaurantDto.Address,
                Stars = restaurantDto.Stars,
                Reviews = restaurantDto.Reviews,
                Category = restaurantDto.Category
            };
            _dbContext.Restaurants.Add(newRestaurant);
            await _dbContext.SaveChangesAsync();
            return newRestaurant;
        }

        public async Task<bool> UpdateAsync(int id, RestaurantDto restaurantDto)
        {
            var restaurantToUpdate = await _dbContext.Restaurants.FindAsync(id);
            if (restaurantToUpdate == null)
            {
                return false;
            }

            restaurantToUpdate.Name = restaurantDto.Name;
            restaurantToUpdate.Image = restaurantDto.Image;
            restaurantToUpdate.Description = restaurantDto.Description;
            restaurantToUpdate.Lng = restaurantDto.Lng;
            restaurantToUpdate.Lat = restaurantDto.Lat;
            restaurantToUpdate.Address = restaurantDto.Address;
            restaurantToUpdate.Stars = restaurantDto.Stars;
            restaurantToUpdate.Reviews = restaurantDto.Reviews;
            restaurantToUpdate.Category = restaurantDto.Category;

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var restaurantToDelete = await _dbContext.Restaurants.FindAsync(id);
            if (restaurantToDelete == null)
            {
                return false;
            }

            _dbContext.Restaurants.Remove(restaurantToDelete);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
