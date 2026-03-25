import { Stack } from "expo-router";
import React from "react";
import colors from "@/constants/colors";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    />
  );
}
