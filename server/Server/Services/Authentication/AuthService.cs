using Microsoft.AspNetCore.Identity;
using Server.Models;

namespace webapi.Services.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly DataContext _dataContext;
        public AuthService(UserManager<IdentityUser> userManager, ITokenService tokenService, DataContext dataContext)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _dataContext = dataContext;
        }
        public async Task<AuthResult> RegisterAsync(string email, string username, string password)
        {
            using var transaction = await _dataContext.Database.BeginTransactionAsync();

            try
            {
                var identityUser = new IdentityUser { UserName = username, Email = email };

                var result = await _userManager.CreateAsync(identityUser, password);

                if (!result.Succeeded)
                {
                    return FailedRegistration(result, email, username);
                }

                var customer = new Customer
                {
                    UserName = username,
                    Email = email,
                    IdentityUserId = identityUser.Id
                };

                _dataContext.Customers.Add(customer);

                await _dataContext.SaveChangesAsync();

                await transaction.CommitAsync();

                return new AuthResult(true, identityUser.Id, email, username, "");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("An error occurred during registration.", ex);
            }
        }



        private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
        {
            var authResult = new AuthResult(false, null, email, username, "");

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
            var role = roles.First();
            var adminAccessToken = _tokenService.CreateToken(managedUser, role);

            return new AuthResult(true, managedUser.Id, managedUser.Email, managedUser.UserName, adminAccessToken);


        }

        private static AuthResult InvalidEmail(string email)
        {
            var result = new AuthResult(false, null, email, "", "");
            result.ErrorMessages.Add("Bad credentials", "Invalid email");
            return result;
        }

        private static AuthResult InvalidPassword(string email, string userName)
        {
            var result = new AuthResult(false, null, email, userName, "");
            result.ErrorMessages.Add("Bad credentials", "Invalid password");
            return result;
        }

        public Task<AuthResult> GoogleLoginAsync(string email)
        {
            throw new NotImplementedException();
        }
    }
}
