import React from "react";
import BaseButton from "@src/components/utils/button";
import ThemeProvider, { useTheme } from "@src/assets/theme/ThemeProvider";
import { View, StyleSheet, Text, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screen } from "react-native-screens";
import { Redirect, useRouter } from "expo-router";

const App = () => {
  const { theme } = useTheme();

  const router = useRouter();

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
            <Button title="test" onPress={() => router.push("/auth/login")} />
            <BaseButton title="Login" />
            <BaseButton title="Sign up" />
          </View>
        </Screen>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
