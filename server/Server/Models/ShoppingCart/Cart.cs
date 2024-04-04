namespace Server.Models.ShoppingCart
{
    public class Cart
    {
        public int CartId { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
    }
}
