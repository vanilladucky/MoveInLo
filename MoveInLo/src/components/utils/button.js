import { Pressable, Text } from "react-native";
import { useTheme } from "@src/assets/theme/ThemeProvider";
import { router } from "expo-router";
import React from "react";
import { styled } from "nativewind";

const BaseButton = (props) => {
  const { theme } = useTheme();
  const StyledPressable = styled(Pressable);

  const onPressHandler = () => {
    router.push(props.link);
  };

  return (
    <StyledPressable
      onPress={onPressHandler}
      className={`border-2 border-primary rounded-lg justify-center items-center
      font-RobotoBold hover:scale-150`}
      style={{
        width: props.width ?? 105,
        height: props.height ?? 38,
        backgroundColor: props.primary ? theme.primary : theme.white,
      }}
    >
      <Text
        className="font-RobotoBlack text-base"
        style={{ color: props.primary ? theme.white : theme.primary }}
      >
        {props.title}
      </Text>
    </StyledPressable>
  );
};

export default BaseButton;
