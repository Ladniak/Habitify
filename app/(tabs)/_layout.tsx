import { Tabs } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "../theme/themes";

export default function TabLayout() {
  const { colors, toggleTheme, theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Tasks",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={toggleTheme}
              style={{ marginRight: 16 }}
            >
              <Text style={{ color: colors.primary }}>
                {theme === "light" ? "🌙" : "☀️"}
              </Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create Task",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="plus.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
