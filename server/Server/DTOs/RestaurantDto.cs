namespace Server.DTOs
{
    public class RestaurantDto
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public double Lng { get; set; }
        public double Lat { get; set; }
        public string Address { get; set; }
        public int Stars { get; set; }
        public string Reviews { get; set; }
        public string Category { get; set; }
    }
}
