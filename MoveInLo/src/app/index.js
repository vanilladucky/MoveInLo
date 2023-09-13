import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import BaseButton from "@src/components/utils/button";
import ThemeProvider, { useTheme } from "@src/assets/theme/ThemeProvider";
import { Screen } from "react-native-screens";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("@src/assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

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
