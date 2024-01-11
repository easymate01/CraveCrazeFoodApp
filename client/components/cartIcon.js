import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";

export default function CartIcon() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}></TouchableOpacity>
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
    marginHorizontal: 5,
    borderRadius: 999,
    padding: 4,
    paddingTop: 3,
    paddingBottom: 4,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
  },
};
