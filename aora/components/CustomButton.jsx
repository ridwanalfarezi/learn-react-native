import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  containerStyle,
  textStyles,
  isLoading,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-xl min-h-[62px] items-center justify-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
