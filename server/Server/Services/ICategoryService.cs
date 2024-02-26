using Server.Models;
using Server.Models.S3;

namespace Server.Services
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(Category category, S3Object obj);
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
    }
}
