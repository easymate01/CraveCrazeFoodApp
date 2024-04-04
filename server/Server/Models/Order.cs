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
        public string CustomerId { get; set; }
        [JsonIgnore]

        public Cart Cart { get; set; }
        public int CartId { get; set; }

        public DateTime Date { get; set; }
    }
}
