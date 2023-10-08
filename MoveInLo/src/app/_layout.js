import React, { useCallback } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import ThemeProvider from "@src/assets/theme/ThemeProvider";
import * as SplashScreen from "expo-splash-screen";

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    RobotoBlack: require("@src/assets/fonts/RobotoBlack.ttf"),
    RobotoBold: require("@src/assets/fonts/RobotoBold.ttf"),
    RobotoLight: require("@src/assets/fonts/RobotoLight.ttf"),
    RobotoMedium: require("@src/assets/fonts/RobotoMedium.ttf"),
    RobotoRegular: require("@src/assets/fonts/RobotoRegular.ttf"),
  });

  const onFontLayoutView = useCallback(async () => {
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
          title: "MoveInLo!",
          headerStyle: {
            backgroundColor: "#181C62",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontFamily: "RobotoBold",
          },

          // Re-enable if user wants to go back
          headerBackTitleVisible: false,
          headerBackVisible: false,
        }}
        onLayout={onFontLayoutView}
      />
    </ThemeProvider>
  );
};

export default RootLayout;
