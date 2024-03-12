using System.ComponentModel.DataAnnotations;

namespace Server.Models.Cart
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        public int CartId { get; set; }

        public int DishId { get; set; }
        public int Quantity { get; set; }
        public Dish Dish { get; set; }
        public decimal Price
        {
            get
            {
                return Dish.Price * Quantity;
            }
        }

    }
}
