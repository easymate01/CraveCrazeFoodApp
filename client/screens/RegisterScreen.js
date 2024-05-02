import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { themeColors } from "../theme";
import API_BASE_URL from "../config";
import BasicButton from "../components/Buttons/Button";
import BackButton from "../components/Buttons/BackButton";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    setLoading(true);

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
        setLoading(false);
        if (res.status !== 201) {
          console.log("Registration error:", res);
          setError("Registration failed. Please try again.");
          alert("Registration failed. Please try again.");
        }
        alert("Registration success. You can login now.");
        return res.json();
      })
      .then((data) => {
        console.log("Registration response:", data);
        navigation.navigate("Login");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Registration error:", error.message);
        setError("Registration failed. Please try again.");
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <BackButton />
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <BasicButton onPress={handleRegister} mode="contained" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </BasicButton>
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
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default RegisterScreen;
