import React, { useCallback } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import ThemeProvider from "@src/assets/theme/ThemeProvider";
import * as SplashScreen from "expo-splash-screen";
import { extendTheme, NativeBaseProvider } from "native-base";

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

  const theme = extendTheme({
    colors: {
      primary: "#181C62",
      secondary: "#D71440",
      black: "#000000",
      white: "#FFFFFF",
      error: "#ED2020",
      gray: "#635C5C",
    },
    components: {
      Input: {
        // Can simply pass default props to change default behaviour of components.
        baseStyle: {
          backgroundColor: "white",
          borderColor: "gray",
          fontFamily: "RobotoRegular",
          marginY: 2,
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
          onLayout={onFontLayoutView}
        />
      </ThemeProvider>
    </NativeBaseProvider>
  );
};

export default RootLayout;
