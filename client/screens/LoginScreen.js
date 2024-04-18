import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { themeColors } from "../theme";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

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
        <Button style={styles.button} title="Login" onPress={handleLogin} />
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
    flexDirection: "row",
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
