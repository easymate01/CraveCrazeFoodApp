using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DishesController : ControllerBase
    {
        private readonly IDish _dishService;
        private readonly ILogger<DishesController> _logger;

        public DishesController(IDish dishService, ILogger<DishesController> logger)
        {
            _dishService = dishService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Dish>>> GetAllDishes()
        {
            var dishes = await _dishService.GetAllAsync();
            return Ok(dishes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dish>> GetDishById(int id)
        {
            var dish = await _dishService.GetByIdAsync(id);
            if (dish == null)
            {
                return NotFound();
            }
            return Ok(dish);
        }
        [HttpPost("/create/dish")]
        public async Task<ActionResult<Dish>> CreateDish(DishDto dish, int restaurantId)
        {
            try
            {
                var newDish = await _dishService.CreateAsync(dish, restaurantId);
                return CreatedAtAction(nameof(GetDishById), new { id = newDish.Id }, newDish);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the dish: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDish(int id, DishDto dish)
        {
            var result = await _dishService.UpdateAsync(id, dish);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDish(int id)
        {
            var result = await _dishService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
