import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantScreen() {
  const { params } = useRoute();
  const item = params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={item.image} />
      </View>
    </ScrollView>
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
    top: 14,
    left: 4,
    backgroundColor: "gray",
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
    marginTop: -12,
    paddingTop: 6,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
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
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
};
