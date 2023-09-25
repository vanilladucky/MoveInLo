import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function TabLayout() {
  const homeIcon = () => <Text>🏠</Text>;
  const scheduleIcon = () => <Text>📆</Text>;
  const trackerIcon = () => <Text>⏳</Text>;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        title={"Home"}
        options={{ title: "Home", tabBarIcon: homeIcon }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: scheduleIcon,
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: "Tracker",
          tabBarIcon: trackerIcon,
        }}
      />
    </Tabs>
  );
}
