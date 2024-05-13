using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Models;

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

        public async Task<List<Customer>> GetAllCustomers()
        {
            return await _dbContext.Customers.ToListAsync();

        }

        public async Task<Customer>? GetCustomerByIdentityUserIdAsync(string IdentityUserId)
        {
            var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.IdentityUserId == IdentityUserId);
            if (customer == null)
            {
                throw new Exception($"Customer with IdentityUserId '{IdentityUserId}' not found.");
            }

            return customer;
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
