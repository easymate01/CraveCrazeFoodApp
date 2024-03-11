﻿using System.Text.Json.Serialization;

namespace Server.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        [JsonIgnore]
        public Order Order { get; set; }
        public int OrderId { get; set; }

        public int DishId { get; set; }
        public Dish Dish { get; set; }

        public int Quantity { get; set; }
    }
}
