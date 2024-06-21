import { useEffect } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { getItem } from "../utils/AsyncStorage";

const AuthWrapper = ({ children }) => {
  const checkToken = async () => {
    const token = await getItem("token");
    if (!token) {
      Alert.alert("Please sign in with your account");
      router.replace("/sign-in");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return children;
};

export default AuthWrapper;
