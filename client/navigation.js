import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import PreparingOrder from "./screens/PreparingOrder";
import DeliveryScreen from "./screens/DeliveryScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import StartScreen from "./screens/StartScreen";
import checkServerStatus from "./components/checkServerStatus";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess } from "./slices/authSlice";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();

  //Check if the user is logged in before from local storage.
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          dispatch(loginSuccess(JSON.parse(userData)));
        }
      } catch (error) {
        console.error("Error loading user data from AsyncStorage:", error);
      }
    };

    loadUserFromStorage();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CheckServerStatus"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CheckServerStatus" component={checkServerStatus} />
        <Stack.Screen name="Starter" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen
          name="Cart"
          options={{ presentation: "modal" }}
          component={CartScreen}
        />
        <Stack.Screen
          name="PreparingOrder"
          options={{ presentation: "fullScreenModal" }}
          component={PreparingOrder}
        />
        <Stack.Screen
          name="Delivery"
          options={{ presentation: "fullScreenModal" }}
          component={DeliveryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*rnf*/
