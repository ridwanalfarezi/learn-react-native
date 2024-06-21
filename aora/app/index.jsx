import { Image, ScrollView, Text, View } from "react-native";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    router.replace("/home");
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView style={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] items-center justify-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-white font-pbold text-3xl text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 right-[65px]"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-center text-gray-100 mt-7">
            Where creativity meets innovation: embark on journey of limitless
            exploration with Aora.
          </Text>
          <CustomButton
            title="Continue with Email"
            onPress={() => router.push("/sign-in")}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
