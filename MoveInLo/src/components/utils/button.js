import { Pressable, Text } from "react-native";
import { useTheme } from "@src/assets/theme/ThemeProvider";
import { router } from "expo-router";
import React from "react";
import { styled } from "nativewind";

const BaseButton = ({
  title,
  primary,
  width,
  height,
  link,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();
  const StyledPressable = styled(Pressable);

  const onPressHandler = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <StyledPressable
      onPress={onPress || onPressHandler}
      className={`border-2 border-primary rounded-lg justify-center items-center
      font-RobotoBold hover:scale-150`}
      style={{
        width: width ?? 105,
        height: height ?? 38,
        backgroundColor: primary ? theme.primary : theme.white,
      }}
    >
      <Text
        className="font-RobotoBlack text-base"
        style={{ color: primary ? theme.white : theme.primary }}
      >
        {title}
      </Text>
    </StyledPressable>
  );
};

export default BaseButton;
