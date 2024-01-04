import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";

export default function RestaurantScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const item = params;

  return (
    <ScrollView style={{}}>
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
    top: 45,
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
