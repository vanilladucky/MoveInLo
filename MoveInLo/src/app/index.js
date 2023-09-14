import React from "react";
import BaseButton from "@src/components/utils/button";
import ThemeProvider, { useTheme } from "@src/assets/theme/ThemeProvider";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screen } from "react-native-screens";
import HomePage from "@src/app/home/_layout";

const App = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme.background,
    },
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Screen style={styles.background}>
          <View style={styles.container}>
            <BaseButton title="Login" />
            <BaseButton title="Sign up" />
          </View>
        </Screen>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
