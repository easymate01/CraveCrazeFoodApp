using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
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
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDto categoryDto, IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            var s3Obj = new S3Object
            {
                BucketName = "cravecraze",
                ImageFile = image,
            };
            var category = new Category
            {
                Name = categoryDto.Name,
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
