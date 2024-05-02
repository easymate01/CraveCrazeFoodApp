import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { themeColors } from "../theme";
import API_BASE_URL from "../config";
import BasicButton from "../components/Buttons/Button";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch(`${API_BASE_URL}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("An error occurred:", res);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Registration response:", data);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <BasicButton mode="contained" onPress={handleLogin}>
          Login
        </BasicButton>
        <Button
          style={styles.button}
          title="Go to Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <Button
        style={styles.continue}
        title="Continue without an account."
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    backgroundColor: themeColors.bgColor(1),
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  continue: {
    position: "absolute",
    bottom: 60,
  },
});
export default LoginScreen;
