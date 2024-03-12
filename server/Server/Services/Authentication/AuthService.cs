using Microsoft.AspNetCore.Identity;
using Server.Models;

namespace webapi.Services.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<Customer> _userManager;
        private readonly ITokenService _tokenService;

        public AuthService(UserManager<Customer> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }
        public async Task<AuthResult> RegisterAsync(string email, string username, string password)
        {

            // Ensure to set the Address property or any other required properties
            var customer = new Customer { UserName = username, Email = email, Address = "" };

            var result = await _userManager.CreateAsync(customer, password);

            if (!result.Succeeded)
            {
                return FailedRegistration(result, email, username);
            }
            //_dataContext.Customers.Add(new Customer() { UserName = username, Email = email, IdentityUserId = identityuser.Id });
            //await _dataContext.SaveChangesAsync();
            return new AuthResult(true, email, username, "");
        }

        private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
        {
            var authResult = new AuthResult(false, email, username, "");

            foreach (var error in result.Errors)
            {
                authResult.ErrorMessages.Add(error.Code, error.Description);
            }

            return authResult;
        }
        public async Task<AuthResult> LoginAsync(string email, string password)
        {
            var managedUser = await _userManager.FindByEmailAsync(email);

            if (managedUser == null)
            {
                return InvalidEmail(email);
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, password);
            if (!isPasswordValid)
            {
                return InvalidPassword(email, managedUser.UserName);
            }
            var roles = await _userManager.GetRolesAsync(managedUser);
            var role = roles.FirstOrDefault();
            var adminAccessToken = _tokenService.CreateToken(managedUser, role);

            return new AuthResult(true, managedUser.Email, managedUser.UserName, adminAccessToken);

        }

        private static AuthResult InvalidEmail(string email)
        {
            var result = new AuthResult(false, email, "", "");
            result.ErrorMessages.Add("Bad credentials", "Invalid email");
            return result;
        }

        private static AuthResult InvalidPassword(string email, string userName)
        {
            var result = new AuthResult(false, email, userName, "");
            result.ErrorMessages.Add("Bad credentials", "Invalid password");
            return result;
        }

        public Task<AuthResult> GoogleLoginAsync(string email)
        {
            throw new NotImplementedException();
        }
    }
}
