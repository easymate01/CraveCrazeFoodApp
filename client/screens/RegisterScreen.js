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
import { emailValidator } from "../services/Validators/emailValidator";
import { passwordValidator } from "../services/Validators/passwordValidator";
import { nameValidator } from "../services/Validators/nameValidator";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    const emailError = emailValidator(email.value);
    const usernameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || usernameError || passwordError) {
      setEmail({ ...email, error: emailError });
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
    fetch(`${API_BASE_URL}/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        username: username.value,
        password: password.value,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 201) {
          alert("Registration success", "You can login now.", [
            { text: "OK", onPress: () => navigation.navigate("Login") },
          ]);
        } else {
          setError("Registration failed. Please try again.");
          alert("Registration failed", "Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Registration failed. Please try again.");
        console.error("Registration error:", error);
        alert("Error", "Registration failed. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {email.error ? <Text style={styles.error}>{email.error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        autoCapitalize="none"
      />
      {username.error ? (
        <Text style={styles.error}>{username.error}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        autoCapitalize="none"
      />
      {password.error ? (
        <Text style={styles.error}>{password.error}</Text>
      ) : null}
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
