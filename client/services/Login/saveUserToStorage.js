import AsyncStorage from "@react-native-async-storage/async-storage";

const saveUserToSLocaltorage = async (userData) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    console.log("User data saved successfully:", userData);
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};

export default saveUserToSLocaltorage;
