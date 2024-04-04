using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;

namespace Server.Services
{
    public class DishService : IDish
    {
        private readonly DataContext _dbContext;

        public DishService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Dish>> GetAllAsync()
        {
            return await _dbContext.Dishes.ToListAsync();
        }

        public async Task<Dish> GetByIdAsync(int id)
        {
            return await _dbContext.Dishes.FindAsync(id);
        }


        public async Task<Dish> CreateAsync(DishDto dish, int restaurantId)
        {
            if (dish == null)
            {
                throw new ArgumentNullException(nameof(dish));
            }

            if (restaurantId <= 0)
            {
                throw new ArgumentException("Invalid restaurant ID. Please provide a valid ID.", nameof(restaurantId));
            }

            var existingRestaurant = await _dbContext.Restaurants.FindAsync(restaurantId);
            if (existingRestaurant == null)
            {
                throw new ArgumentException("Restaurant with the provided ID does not exist.", nameof(restaurantId));
            }

            var newDish = new Dish(dish.Price)
            {
                Name = dish.Name,
                Description = dish.Description,
                Price = dish.Price,
                Image = dish.Image,
                RestaurantId = restaurantId
            };

            _dbContext.Dishes.Add(newDish);
            await _dbContext.SaveChangesAsync();

            return newDish;
        }

        public async Task<bool> UpdateAsync(int id, DishDto dishDto)
        {
            var dishToUpdate = await _dbContext.Dishes.FindAsync(id);
            if (dishToUpdate == null)
            {
                return false;
            }

            dishToUpdate.Name = dishDto.Name;
            dishToUpdate.Description = dishDto.Description;
            dishToUpdate.Price = dishDto.Price;
            dishToUpdate.Image = dishDto.Image;

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var dishToDelete = await _dbContext.Dishes.FindAsync(id);
            if (dishToDelete == null)
            {
                return false;
            }

            _dbContext.Dishes.Remove(dishToDelete);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
