using Microsoft.AspNetCore.Identity;

namespace Server.Services
{
    public class UserService : IUser
    {
        private readonly DataContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public UserService(DataContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<IdentityUser>? GetUserByNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return null;
            }

            return user;
        }
    }
}
