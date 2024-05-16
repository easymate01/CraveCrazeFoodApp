import React, { useEffect } from "react";
import { Button, Paragraph } from "react-native-paper";
import BasicButton from "../components/Buttons/Button";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../components/Header/header";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/authSlice";

export default function StartScreen({ navigation }) {
  const isLoggedIn = useSelector(selectUser);

  useEffect(() => {
    // If the user is logged in, navigate to the HomeScreen
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bikeGuy.png")}
        style={styles.image}
      />
      <Header>Welcome To CraveCraze!</Header>
      <Paragraph>This is a food ordering application.</Paragraph>
      <BasicButton
        mode="contained"
        onPress={() => navigation.navigate("Login")}
        style={{ marginBottom: 10 }}
      >
        Login
      </BasicButton>
      <BasicButton
        mode="outlined"
        onPress={() => navigation.navigate("Register")}
      >
        Sign Up
      </BasicButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 0,
  },
});
