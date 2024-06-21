import { View, Text, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/fetch";
import { setItem } from "../../utils/AsyncStorage";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = () => {
    const { username, password } = form;
    if (!username || !password) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      const { data, error } = await signIn(form);
      if (data) {
        await setItem("token", data.token);
        Alert.alert(data.msg);
        router.replace("/");
      }
      if (error) {
        Alert.alert(error);
      }
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4">
          <Text className="text-white text-3xl font-psemibold">Sign In</Text>
          <FormField
            title="Username"
            placeholder="Enter your username"
            value={form.username}
            handleChangeText={(value) => setForm({ ...form, username: value })}
            otherStyles="mt-10"
            keyboardType="username"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            onPress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-md text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-md font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
