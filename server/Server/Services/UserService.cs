using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IEnumerable<IdentityUser>?> GetAllUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
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

        public async Task<IdentityUser> DeleteUser(string userId)
        {
            var userToDelete = await _userManager.FindByIdAsync(userId);
            var dbContextUser = await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == userId);


            if (userToDelete == null)
            {
                return null;
            }
            await _userManager.DeleteAsync(userToDelete);

            _dbContext.Users.Remove(dbContextUser);
            _dbContext.SaveChanges();

            return userToDelete;
        }
    }
}
