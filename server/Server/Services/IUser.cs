using Microsoft.AspNetCore.Identity;

namespace Server.Services
{
    public interface IUser
    {
        Task<IdentityUser> DeleteUser(string userId);
        Task<IEnumerable<IdentityUser>?> GetAllUsersAsync();
        Task<IdentityUser>? GetUserByNameAsync(string userName);
    }
}
