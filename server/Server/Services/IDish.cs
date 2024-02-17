using Server.DTOs;
using Server.Models;

namespace Server.Services
{
    public interface IDish
    {
        Task<List<Dish>> GetAllAsync();
        Task<Dish> GetByIdAsync(int id);
        Task<Dish> CreateAsync(DishDto dishDto);
        Task<bool> UpdateAsync(int id, DishDto dishDto);
        Task<bool> DeleteAsync(int id);
    }
}
