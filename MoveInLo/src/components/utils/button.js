import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@src/assets/theme/ThemeProvider";

const BaseButton = (props) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      borderRadius: 6,
      borderWidth: 2,
      borderColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "700",
    },
  });

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
      <Pressable>
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
