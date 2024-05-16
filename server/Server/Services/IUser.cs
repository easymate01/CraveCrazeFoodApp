using Microsoft.AspNetCore.Identity;
using Server.Models;

namespace Server.Services
{
    public interface IUser
    {
        Task<IdentityUser> DeleteUser(string userId);
        Task<IEnumerable<IdentityUser>?> GetAllUsersAsync();
        Task<IdentityUser>? GetUserByNameAsync(string userName);

        Task<List<Customer>> GetAllCustomers();
        Task<Customer>? GetCustomerByIdentityUserIdAsync(string IdentityUserId);

    }
}
