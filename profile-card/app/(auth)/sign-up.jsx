import { View, Text, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signUp } from "../../lib/fetch";

const SignUp = () => {
  const [form, setForm] = useState({
    fullname: "",
    city: "",
    country: "",
    job: "",
    username: "",
    password: "",
    cpassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const { fullname, city, country, job, username, password, cpassword } =
      form;
    if (
      !fullname ||
      !city ||
      !country ||
      !job ||
      !username ||
      !password ||
      !cpassword
    ) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }
    if (password !== cpassword) {
      Alert.alert(
        "Validation Error",
        "Password and Confirm Password do not match."
      );
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      const { data, error } = await signUp(form);
      if (data) {
        Alert.alert(data.msg);
        router.replace("/sign-in");
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
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-white text-3xl font-psemibold">Sign Up</Text>
          <FormField
            title="Full Name"
            placeholder="Enter Your Full Name"
            value={form.fullname}
            handleChangeText={(value) => setForm({ ...form, fullname: value })}
            otherStyles="mt-10"
            keyboardType="default"
          />
          <FormField
            title="City"
            placeholder="Enter Your City"
            value={form.city}
            handleChangeText={(value) => setForm({ ...form, city: value })}
            otherStyles="mt-7"
            keyboardType="default"
          />
          <FormField
            title="Country"
            placeholder="Enter Your Country"
            value={form.country}
            handleChangeText={(value) => setForm({ ...form, country: value })}
            otherStyles="mt-7"
            keyboardType="default"
          />
          <FormField
            title="Job"
            placeholder="Enter Your Job"
            value={form.job}
            handleChangeText={(value) => setForm({ ...form, job: value })}
            otherStyles="mt-7"
            keyboardType="default"
          />
          <FormField
            title="Username"
            placeholder="Enter Your Username"
            value={form.username}
            handleChangeText={(value) => setForm({ ...form, username: value })}
            otherStyles="mt-7"
            keyboardType="default"
          />
          <FormField
            title="Password"
            placeholder="Enter Your Password"
            value={form.password}
            handleChangeText={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-7"
            secureTextEntry
          />
          <FormField
            title="Confirm Password"
            placeholder="Enter Confirmation Password"
            value={form.cpassword}
            handleChangeText={(value) => setForm({ ...form, cpassword: value })}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton
            title="Sign Up"
            onPress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-md text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-md font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
