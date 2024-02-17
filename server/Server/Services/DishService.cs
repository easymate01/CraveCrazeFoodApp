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

        public async Task<Dish> CreateAsync(DishDto dishDto)
        {
            var newDish = new Dish
            {
                Name = dishDto.Name,
                Description = dishDto.Description,
                Price = dishDto.Price,
                Image = dishDto.Image
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
