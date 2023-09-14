import { Stack } from "expo-router";
import ThemeProvider from "@src/assets/theme/ThemeProvider";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useCallback } from "react";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    RobotoBold: require("@src/assets/fonts/Roboto-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          title: "MoveInLo",
          headerStyle: {
            backgroundColor: "#181C62",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "RobotoBold",
          },
        }}
      >
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="home" />
      </Stack>
    </ThemeProvider>
  );
}
