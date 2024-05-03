namespace webapi.Services.Authentication
{
    public record AuthResponse(string IdentityUserId, string Email, string UserName, string Token);
}
