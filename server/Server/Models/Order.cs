using System.Text.Json.Serialization;

namespace Server.Models
{
    public class Order
    {
        public int Id { get; set; }

        [JsonIgnore]
        public Restaurant Restaurant { get; set; }
        public int RestaurantId { get; set; }

        [JsonIgnore]
        public Customer Customer { get; set; }
        public int CustomerId { get; set; }

        public List<Dish> Items { get; set; }
    }
}
