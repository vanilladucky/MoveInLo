import { Stack } from "expo-router";

const Header = ({ children, ...props }) => {
  return (
    <Stack
      screenOptions={{
        // Header Title
        title: "MoveInLo!",
        headerStyle: {
          backgroundColor: "#181C62",
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontFamily: "RobotoBold",
        },

        // Header Back Button
        headerBackTitle: "Back",
        headerBackStyle: {
          backgroundColor: "#181C62",
        },
        headerBackTitleStyle: {
          fontFamily: "RobotoMedium",
        },
        headerBackTitleVisible: true,
        headerBackVisible: true,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};

export default Header;
