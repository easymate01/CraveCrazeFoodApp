using Microsoft.AspNetCore.Identity;
using Server.Models.ShoppingCart;

namespace Server.Models
{
    public class Customer : IdentityUser
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Address { get; set; }

        public int CartId { get; set; }
        public Cart Cart { get; set; }

        public Customer()
        {
            FirstName = "";
            LastName = "";
            Phone = "";
            Country = "";
            City = "";
            PostalCode = "";
            Address = "";
        }
    }
}