using System.Text.Json.Serialization;
namespace Server.Models
{
    public class Dish
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }

        public int RestaurantId { get; set; }
        [JsonIgnore]
        public Restaurant Restaurant { get; set; }

        public Dish(decimal price)
        {
            if (price <= 0)
            {
                throw new ArgumentException("Price of the dish cannot be zero or negative.");
            }
            Price = price;
        }
    }
}
