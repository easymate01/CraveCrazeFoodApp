import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function PreparingOrder() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  }, []);
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={require("../assets/images/delivery.gif")}
        style={styles.loadingImage}
      />
      <Text>Loading...</Text>
    </View>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingImage: {
    height: 350,
    width: 350,
  },
};
