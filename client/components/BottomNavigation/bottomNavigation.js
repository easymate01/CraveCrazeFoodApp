import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";

function BottomNavigation() {
  const [active, setActive] = useState("Home"); // default active icon is 'Home'

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => setActive("Home")}>
        <Icon.Home
          stroke={active === "Home" ? "#D62828" : "#000"}
          width={24}
          height={24}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive("ShoppingBag")}>
        <Icon.ShoppingBag
          stroke={active === "ShoppingBag" ? "#D62828" : "#000"}
          width={24}
          height={24}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive("Search")}>
        <Icon.Search
          stroke={active === "Search" ? "#D62828" : "#000"}
          width={24}
          height={24}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive("User")}>
        <Icon.User
          stroke={active === "User" ? "#D62828" : "#000"}
          width={24}
          height={24}
        />
      </TouchableOpacity>
    </View>
  );
}

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    position: "absolute",
    bottom: 5,
    width: "100%",
  },
});
