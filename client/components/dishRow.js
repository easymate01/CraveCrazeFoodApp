import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useDispatch } from "react-redux";

export default function DishRow({ item }) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={item.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon.Minus
                onPress={handleDecrement}
                strokeWidth={2}
                height={20}
                width={20}
                stroke={"white"}
              ></Icon.Minus>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Icon.Plus
                onPress={handleIncrement}
                strokeWidth={2}
                height={20}
                width={20}
                stroke={"white"}
              ></Icon.Plus>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    marginBottom: 12,
    marginHorizontal: 2,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
  },
  textContainer: {
    paddingLeft: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "#4B5563",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 12,
    marginTop: 6,
  },
  price: {
    color: "#4B5563",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: themeColors.bgColor(1),
    marginRight: 6,
  },
  quantity: {
    paddingHorizontal: 5,
  },
};