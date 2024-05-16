import { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function CheckServerStatus({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/status`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === "ok") {
            console.log("Server is now listening.");
            setLoading(false);
            navigation.navigate("Welcome");
          }
        } else {
          console.error("Server returned an error:", response.status);
        }
      } catch (error) {
        console.error("Error checking server status:", error);
      }
    };

    checkStatus();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>Server is up and running</Text>
      )}
    </View>
  );
}
