import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@src/assets/theme/ThemeProvider";
import { router } from "expo-router";
import React, { useState } from "react";

const BaseButton = (props) => {
  const { theme } = useTheme();
  const [hover, setHover] = useState(false);

  const styles = StyleSheet.create({
    button: {
      borderRadius: 6,
      borderWidth: 2,
      borderColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    "button:hover": {
      transform: "scale(1.2)",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "700",
    },
  });

  const onPressHandler = () => {
    router.push(props.link);
  };

  return (
    <View
      style={[
        styles.button,
        {
          // Default settings for button
          backgroundColor: props.primary ? theme.primary : theme.white,
          width: props.width ?? 105,
          height: props.height ?? 38,
        },
      ]}
    >
      <Pressable onPress={onPressHandler}>
        <Text
          style={[
            styles.buttonText,
            { color: props.primary ? theme.white : theme.primary },
          ]}
        >
          {props.title}
        </Text>
      </Pressable>
    </View>
  );
};

export default BaseButton;
