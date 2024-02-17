using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestaurantsController : Controller
    {
        private readonly IRestaurant _restaurantService;
        private readonly ILogger<RestaurantsController> _logger;

        public RestaurantsController(IRestaurant restaurantService, ILogger<RestaurantsController> logger)
        {
            _restaurantService = restaurantService;
            _logger = logger;
        }

        [HttpPost("/create/restaurant")]
        public async Task<ActionResult<Restaurant>> CreateRestaurant(RestaurantDto restaurant)
        {
            if (restaurant.Name == null)
            {
                return BadRequest("Invalid username. A valid username is required.");
            }

            var newRestaurant = await _restaurantService.CreateAsync(restaurant);
            return Ok(newRestaurant);

        }
    }
}

