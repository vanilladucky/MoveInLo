import Header from "@src/components/navbar/header";
import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Header>
      <Stack.Screen name={"options"} />
      <Stack.Screen name={"movein"} />
      <Stack.Screen name={"moveinsuccess"} />
    </Header>
  );
}
