using Server.Models;
using Server.Models.S3;
using Server.Services.AwsS3;
using S3Object = Server.Models.S3.S3Object;

namespace Server.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _dbContext;

        private readonly StorageService _storageService; // Inject the StorageService

        public CategoryService(DataContext dbContext, StorageService storageService)
        {
            _dbContext = dbContext;
            _storageService = storageService;
        }

        public async Task<Category> CreateCategoryAsync(Category category, S3Object obj)
        {
            var cred = new AwsCredentials()
            {
                AwsKey = Environment.GetEnvironmentVariable("AWSAccessKey"),
                AwsSecret = Environment.GetEnvironmentVariable("AWSSecretKey"),

            };
            // Upload image to S3 and get the image URL
            var imageUrl = await _storageService.UploadImageAsync(obj.ImageFile, cred, obj.BucketName);

            // Create the category object with the image URL
            var newCategory = new Category
            {
                Name = category.Name,
                ImageUrl = imageUrl
            };

            // Save category to database
            //_dbContext.Categories.Add(newCategory);
            await _dbContext.SaveChangesAsync();

            return newCategory;
        }



        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _dbContext.Categories.FindAsync(id);
        }
    }
}