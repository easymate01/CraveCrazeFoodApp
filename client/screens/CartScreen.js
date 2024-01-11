import { View, Text, TouchableOpacity } from "react-native";
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
      <View style={styles.topButtonContainer}>
        <TouchableOpacity style={styles.topButton} onPress={navigation.goBack}>
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
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
};
