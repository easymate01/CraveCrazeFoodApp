using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUser _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger, IUser userService)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("/users"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetAllUser()
        {
            var users = await _userService.GetAllUsersAsync();

            return Ok(users);
        }

        [HttpGet("/customers"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetAllCostumers()
        {
            var users = await _userService.GetAllCustomers();

            return Ok(users);
        }


        [HttpGet("/user/{userName}")]
        public async Task<ActionResult<IdentityUser>> GetUserByName(string userName)
        {
            var user = await _userService.GetUserByNameAsync(userName);

            return Ok(user);
        }
        [HttpDelete("/user/delete/{userId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<Customer>> DeleteUserById(string userId)
        {
            var userToDelete = await _userService.DeleteUser(userId);
            if (userToDelete == null)
            {
                return NotFound("This user doesn't exist");
            }
            return Ok(userToDelete);
        }

    }
}
