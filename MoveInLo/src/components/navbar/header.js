import { Stack } from "expo-router";

const Header = ({ children }) => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
      }}
    >
      {children}
    </Stack>
  );
};

export default Header;
