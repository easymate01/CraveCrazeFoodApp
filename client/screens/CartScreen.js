import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { featured } from "../constants";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const restaurant = featured.restaurants[0];
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* top button */}
      <View style={styles.topButtonContainer}>
        <TouchableOpacity style={styles.topButton} onPress={navigation.goBack}>
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.cartTitle}>Your Cart</Text>
          <Text style={styles.resturantTitle}>{restaurant.name}</Text>
        </View>
      </View>

      {/* delivery time */}
      <View
        style={styles.deliveryTimeContainer}
        className="flex-row px-4 items-center"
      >
        <Image
          source={require("../assets/images/bikeGuy.png")}
          style={styles.deliveryImage}
        />
        <Text style={styles.deliveryText}>Deliver in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topButtonContainer: {
    position: "relative",
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 4,
    zIndex: 10,
  },
  topButton: {
    backgroundColor: themeColors.bgColor(1),
    borderRadius: 999,
    padding: 8,
    position: "absolute",
    top: 5,
    left: 10,
  },
  cartTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  resturantTitle: {
    textAlign: "center",
    color: "#888",
  },
  deliveryTimeContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: themeColors.bgColor(0.2),
    alignItems: "center",
  },
  deliveryImage: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },
  deliveryText: {
    flex: 1,
    paddingLeft: 20,
  },
  changeText: {
    color: themeColors.text,
    fontWeight: "bold",
  },
};
