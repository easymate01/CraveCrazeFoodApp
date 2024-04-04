using Microsoft.AspNetCore.Identity;
using Server.Models.ShoppingCart;
using System.Text.Json.Serialization;

namespace Server.Models
{
    public class Customer
    {
        public string Id { get; set; }
        public string? UserName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Address { get; set; }

        public int? CartId { get; set; }
        public Cart Cart { get; set; }

        public string IdentityUserId { get; set; }

        [JsonIgnore]
        public IdentityUser IdentityUser { get; set; }


        public Customer()
        {
            Id = Guid.NewGuid().ToString();
        }

    }
}