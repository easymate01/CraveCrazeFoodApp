using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Models.S3;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(IFormFile file, string name)
        {
            await using var memoryStr = new MemoryStream();

            await file.CopyToAsync(memoryStr);


            if (file == null || file.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            var s3Obj = new S3Object
            {
                BucketName = "cravecraze",
                ImageFile = file,
            };
            var category = new Category
            {
                Name = name,
            };


            try
            {
                var createdCategory = await _categoryService.CreateCategoryAsync(category, s3Obj);
                return CreatedAtAction(nameof(GetCategory), new { id = createdCategory.Id }, createdCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the category: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _categoryService.GetAllCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving categories: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            try
            {
                var category = await _categoryService.GetCategoryByIdAsync(id);
                if (category == null)
                {
                    return NotFound();
                }
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the category: {ex.Message}");
            }
        }

    }
}
