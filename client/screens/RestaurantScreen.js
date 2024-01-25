import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import DishRow from "../components/dishRow";
import CartIcon from "../components/cartIcon";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";

import { setRestaurant } from "../slices/restaurantSlice";

export default function RestaurantScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const item = params;
  let dispatch = useDispatch();

  useEffect(() => {
    if (item && item.id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, []);
  return (
    <View>
      <CartIcon />
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.image} source={item.image} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon.ArrowLeft
              strokeWidth={3}
              stroke={themeColors.bgColor(1)}
            ></Icon.ArrowLeft>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingIconContainer}>
              <Image
                source={require("../assets/images/fullStar.png")}
                style={styles.ratingIcon}
              />
              <Text style={styles.ratingText}>
                <Text style={styles.greenText}>{item.stars}</Text>
                <Text style={styles.grayText}> ({item.reviews} review)</Text>
                <Text style={styles.boldGrayText}>{item.category}</Text>
              </Text>
            </View>
            <View style={styles.addressContainer}>
              <Icon.MapPin color="gray" width={15} height={15} />
              <Text style={styles.grayText}> Nearby · {item.address}</Text>
            </View>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menu</Text>
          {item.dishes.map((dish, index) => (
            <DishRow item={{ ...dish }} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    position: "relative",
    paddingBottom: 36,
  },
  image: {
    width: "100%",
    height: 270,
  },
  backButton: {
    position: "absolute",
    top: 49,
    left: 20,
    backgroundColor: "white",
    padding: 2,
    borderRadius: 999,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  infoContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    marginTop: -90,
    paddingTop: 6,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 1,
  },
  ratingIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    height: 16,
    width: 16,
  },
  ratingText: {
    fontSize: 12,
    color: "#4B5563",
    paddingLeft: 4,
  },
  greenText: {
    color: "green",
  },
  grayText: {
    color: "gray",
  },
  boldGrayText: {
    fontWeight: "bold",
    color: "gray",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    color: "#4B5563",
    marginTop: 2,
  },
  menuContainer: {
    paddingBottom: 36,
    backgroundColor: "white",
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
};
