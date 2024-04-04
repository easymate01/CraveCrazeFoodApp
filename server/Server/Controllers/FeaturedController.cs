using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturedController : ControllerBase
    {
        private readonly IRestaurant _restaurantService;
        private readonly IDish _dishService;

        public FeaturedController(IRestaurant restaurantService, IDish dishService)
        {
            _restaurantService = restaurantService;
            _dishService = dishService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFeaturedRestaurants()
        {
            try
            {
                // Fetch data from the service
                var featuredRestaurants = await _restaurantService.GetAllAsync();

                // Map the fetched data to the desired response structure
                var response = new
                {
                    id = 1,
                    title = "Hot and Spicy",
                    description = "soft and tender fried chicken",
                    restaurants = featuredRestaurants.Select(r => new
                    {
                        id = r.Id,
                        name = r.Name,
                        image = r.Image,
                        description = r.Description,
                        lng = r.Lng,
                        lat = r.Lat,
                        address = r.Address,
                        stars = r.Stars,
                        reviews = r.Reviews,
                        category = r.Category,
                        dishes = r.Dishes.Select(d => new
                        {
                            id = d.Id,
                            name = d.Name,
                            description = d.Description,
                            price = d.Price,
                            image = d.Image
                        })
                    })
                };

                // Return the response
                return new OkObjectResult(response);
            }
            catch (Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
