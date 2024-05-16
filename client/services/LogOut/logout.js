import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLogout = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(logout());
    AsyncStorage.removeItem("userData");
  }, [dispatch]);
};
export default useLogout;
