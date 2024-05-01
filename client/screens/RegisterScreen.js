import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { themeColors } from "../theme";
import API_BASE_URL from "../config";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    fetch(`${API_BASE_URL}/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status !== 201) {
          console.log("Registration error:", res);
        } else if (res.status === 400) {
          console.log(
            "Username or email is already taken, or password is not valid."
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log("Registration response:", data);
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button style title="Register" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    color: themeColors.bgColor(1),
  },
});

export default RegisterScreen;
