import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-psemibold text-xl text-white text-center">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100 mt-2">
        {subtitle}
      </Text>
      <CustomButton
        title="Create Video"
        containerStyle="w-3/4 my-5"
        onPress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
