namespace Server.Models.Cart
{
    public class Cart
    {
        public int CartId { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
    }
}
