import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { themeColors } from "../theme";
import API_BASE_URL from "../config";
import BasicButton from "../components/Buttons/Button";
import { emailValidator } from "../services/Validators/emailValidator";
import { passwordValidator } from "../services/Validators/passwordValidator";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../slices/authSlice";
import BackButton from "../components/Buttons/BackButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    fetch(`${API_BASE_URL}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Failed to log in");
        }
      })
      .then((data) => {
        console.log("Login response:", data);
        dispatch(loginSuccess(data));
        navigation.navigate("Home");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Login error:", error.message);
        dispatch(loginFailure(error.message));
        alert("Failed to log in. Please try again later.");
      });
    return;
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {email.error ? <Text style={styles.error}>{email.error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {password.error ? (
        <Text style={styles.error}>{password.error}</Text>
      ) : null}
      <View style={styles.buttonContainer}>
        <BasicButton mode="contained" onPress={handleLogin}>
          {loading ? "Loading..." : "Login"}
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
  error: {
    color: "red",
    marginBottom: 5,
  },
});
export default LoginScreen;
