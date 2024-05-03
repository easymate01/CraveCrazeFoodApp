using Microsoft.AspNetCore.Identity;

namespace Server.Services
{
    public interface IUser
    {
        Task<IdentityUser>? GetUserByNameAsync(string userName);
    }
}
