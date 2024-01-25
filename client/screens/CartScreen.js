import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { featured } from "../constants";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux/dist/react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";

export default function CartScreen() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* top button */}
      <View style={styles.topButtonContainer}>
        <TouchableOpacity style={styles.topButton} onPress={navigation.goBack}>
          <Icon.ArrowLeft
            strokeWidth={3}
            stroke="white"
            onPress={() => navigation.goBack()}
          />
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
      {/* dishes */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.dishesContainer}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {restaurant.dishes.map((dish, index) => {
          return (
            <View key={index} style={styles.dishItem}>
              <Text style={styles.quantityText}>2 x </Text>
              <Image style={styles.dishImage} source={dish.image} />
              <Text style={styles.dishName}>{dish?.name}</Text>
              <Text style={styles.dishPrice}>${dish?.price}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                // onPress={() => dispatch(removeFromBasket({ id: dish[0]?.id }))}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* totals */}
      <View style={styles.totalsContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>${10}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Delivery Fee</Text>
          <Text style={styles.totalValue}>${10}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.orderTotalLabel}>Order Total</Text>
          <Text style={styles.orderTotalValue}>${10 + 20}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={() => navigation.navigate("PreparingOrder")}
          >
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
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
  dishesContainer: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  dishItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
  },
  quantityText: {
    color: themeColors.text,
    fontWeight: "bold",
  },
  dishImage: {
    paddingLeft: 20,
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  dishName: {
    paddingLeft: 10,
    flex: 1,
    fontWeight: "bold",
    color: "#333",
  },
  dishPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  removeButton: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: themeColors.bgColor(1),
  },
  totalsContainer: {
    backgroundColor: themeColors.bgColor(0.2),
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 0,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalLabel: {
    color: "#555",
  },
  totalValue: {
    fontWeight: "bold",
  },
  orderTotalLabel: {
    fontWeight: "bold",
  },
  orderTotalValue: {
    fontWeight: "bold",
    fontSize: 18,
    color: themeColors.text,
  },
  placeOrderButton: {
    backgroundColor: themeColors.bgColor(1),
    padding: 18,
    borderRadius: 999,
  },
  placeOrderButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
};
