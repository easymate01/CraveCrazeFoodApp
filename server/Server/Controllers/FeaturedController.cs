using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturedController : ControllerBase
    {
        private readonly RestaurantService _restaurantService;
        private readonly DishService _dishService;

        public FeaturedController(RestaurantService restaurantService, DishService dishService)
        {
            _restaurantService = restaurantService;
            _dishService = dishService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFeaturedRestaurants()
        {
            try
            {
                // Get featured restaurants from the database
                var featuredRestaurants = await _restaurantService.GetAllAsync();

                // Create a list to store the formatted response
                var response = new List<object>();

                // Iterate over each featured restaurant and format the data
                foreach (var restaurant in featuredRestaurants)
                {
                    var dishes = await _dishService.GetDishesByRestaurantIdAsync(restaurant.Id);

                    var formattedRestaurant = new
                    {
                        id = restaurant.Id,
                        name = restaurant.Name,
                        image = restaurant.Image,
                        description = restaurant.Description,
                        lng = restaurant.Lng,
                        lat = restaurant.Lat,
                        address = restaurant.Address,
                        stars = restaurant.Stars,
                        reviews = restaurant.Reviews,
                        category = restaurant.Category,
                        dishes = dishes.Select(d => new
                        {
                            id = d.Id,
                            name = d.Name,
                            description = d.Description,
                            price = d.Price,
                            image = d.Image
                        }).ToList()
                    };

                    response.Add(formattedRestaurant);
                }

                return Ok(response);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}
