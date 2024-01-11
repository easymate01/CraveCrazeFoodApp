import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";

export default function CartIcon() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </TouchableOpacity>
      <Text>CartIcon</Text>
    </View>
  );
}

const styles = {
  container: {
    position: "absolute",
    bottom: 5,
    width: "100%",
    zIndex: 50,
  },
  button: {
    backgroundColor: themeColors.bgColor(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 999,
    padding: 20,
    paddingTop: 7,
    paddingBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
  },
  badge: {
    padding: 20,
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
};
