﻿using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace webapi.Services.Authentication
{
    public class TokenService : ITokenService
    {
        private const int ExpirationMinutes = 30;


        public string CreateToken(IdentityUser user, string role)
        {
            var expiration = DateTime.UtcNow.AddMinutes(ExpirationMinutes);
            var token = CreateJwtToken(
                CreateClaims(user, role),
                CreateSigningCredentials(),
                expiration
            );
            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
        private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials,
        DateTime expiration) =>
        new(
            "apiWithAuthBackend",
            "apiWithAuthBackend",
            claims,
            expires: expiration,
            signingCredentials: credentials
        );
        private List<Claim> CreateClaims(IdentityUser user, string role)
        {
            try
            {
                var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, "TokenForTheApiWithAuth"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };
                if (role != null)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }
                return claims;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        private SigningCredentials CreateSigningCredentials()
        {
            string secretKey = "!SomethingSecret!";
            byte[] keyBytes = Encoding.UTF8.GetBytes(secretKey);

            // Trim or pad the key to make it exactly 32 bytes
            Array.Resize(ref keyBytes, 32);

            return new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256
            );
        }
    }
}
