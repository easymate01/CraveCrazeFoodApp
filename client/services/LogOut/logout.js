import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useCallback(() => {
    dispatch(logout());
    AsyncStorage.removeItem("userData");
    navigation.navigate("Starter");
    Alert.alert("You Logged out!");
  }, [dispatch]);
};
export default useLogout;
