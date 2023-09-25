import React from "react";
import BaseButton from "@src/components/utils/button";
import ThemeProvider, { useTheme } from "@src/assets/theme/ThemeProvider";
import { View, StyleSheet, Text, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screen } from "react-native-screens";
import LandingIcon from "@src/assets/splash/LandingLogo.png";

const App = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme.background,
    },
    font: {
      fontFamily: "RobotoBold",
      fontSize: 20,
      textAlign: "center",
      padding: 15,
    },
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      gap: 20,
    },
  });

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Screen style={[styles.background, styles.container, styles.font]}>
          <View>
            <Text style={styles.font}>Welcome to</Text>
            <Image source={LandingIcon} />
            <Text style={styles.font}>MoveInLo!</Text>
          </View>
          <View style={styles.buttons}>
            <BaseButton title="Login" link="/auth/login" />
            <BaseButton title="Sign up" link="/auth/signup" />
          </View>
        </Screen>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
