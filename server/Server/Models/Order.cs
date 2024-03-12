using Server.Models.ShoppingCart;
using System.Text.Json.Serialization;

namespace Server.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        [JsonIgnore]
        public Restaurant Restaurant { get; set; }
        public int RestaurantId { get; set; }

        [JsonIgnore]
        public Customer Customer { get; set; }
        public int CustomerId { get; set; }

        public ICollection<Cart> Carts { get; set; }

        public DateTime Date { get; set; }
    }
}
