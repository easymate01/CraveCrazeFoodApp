using System.ComponentModel.DataAnnotations;

namespace Server.Models.ShoppingCart
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
                if (Dish == null)
                {
                    throw new InvalidOperationException("Dish is not set for the cart item.");
                }

                if (Dish.Price <= 0)
                {
                    throw new InvalidOperationException("Price of the dish cannot be zero.");
                }

                return Dish.Price * Quantity;
            }
        }

    }
}
