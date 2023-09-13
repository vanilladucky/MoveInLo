import { Stack } from "expo-router";
import Footer from "@src/components/navbar/footer";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#181C62",
        },
        headerTintColor: "#fff",
      }}
    >
      <Footer />
    </Stack>
  );
}
