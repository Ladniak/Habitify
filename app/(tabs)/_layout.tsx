import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, Tabs } from "expo-router";
import React from "react";
import { Pressable, Alert, View, Text } from "react-native";
import { useTheme } from "../../theme/themes";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { auth } from "../../firebase/config";

export default function TabLayout() {
  const { colors, toggleTheme, theme } = useTheme();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      router.replace("/auth/login");
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
      console.error(error);
    }
  };

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
            <View style={{ flexDirection: "row", marginRight: 8 }}>
              <Pressable onPress={toggleTheme} style={{ marginRight: 8 }}>
                {theme === "light" ? (
                  <IconSymbol size={26} name="moon.fill" color={colors.text} />
                ) : (
                  <IconSymbol size={26} name="sun.max.fill" color={colors.text} />
                )}
              </Pressable>
              <Pressable onPress={handleLogout}>
                <IconSymbol
                  size={26}
                  name='arrowshape.turn.up.left.fill'
                  color={colors.text}
                />
              </Pressable>
            </View>
          )
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
            <View style={{ flexDirection: "row", marginRight: 8 }}>
              <Pressable onPress={toggleTheme} style={{ marginRight: 8 }}>
                {theme === "light" ? (
                  <IconSymbol size={26} name="moon.fill" color={colors.text} />
                ) : (
                  <IconSymbol size={26} name="sun.max.fill" color={colors.text} />
                )}
              </Pressable>
              <Pressable onPress={handleLogout}>
                <IconSymbol size={26} name="arrowshape.turn.up.left.fill" color={colors.text} />
              </Pressable>
            </View>
          )
        }}
      />
    </Tabs>
  );
}

