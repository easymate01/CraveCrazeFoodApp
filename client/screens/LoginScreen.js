import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;
