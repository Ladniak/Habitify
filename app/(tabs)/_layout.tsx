import { Tabs } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
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
        headerStyle: {
          backgroundColor: colors.background,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          marginBottom: 0,
          marginTop: 0,
        },
        headerTintColor: colors.text,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Tasks",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="list.bullet.rectangle.fill" color={color} />
          ),
          headerRight: () => (
            <Pressable onPress={toggleTheme} style={{ marginRight: 8 }}>
              {theme === "light" ? (
                <IconSymbol size={26} name="moon.fill" color={colors.text} />
              ) : (
                <IconSymbol size={26} name="sun.max.fill" color={colors.text} />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create Task",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="square.and.pencil" color={color} />
          ),
          headerRight: () => (
            <Pressable onPress={toggleTheme} style={{ marginRight: 16 }}>
              {theme === "light" ? (
                <IconSymbol size={26} name="moon.fill" color={colors.text} />
              ) : (
                <IconSymbol size={26} name="sun.max.fill" color={colors.text} />
              )}
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}

