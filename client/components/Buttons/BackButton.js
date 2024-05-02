import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import * as Icon from "react-native-feather";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      <Icon.ArrowLeft
        strokeWidth={3}
        stroke={themeColors.bgColor(1)}
      ></Icon.ArrowLeft>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
