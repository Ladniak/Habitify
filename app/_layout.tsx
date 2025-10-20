import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProvider, useTheme } from "../theme/themes";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <InnerLayout />
      </ThemeProvider>
    </Provider>
  );
}

function InnerLayout() {
  const { colors } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      >
        {/* 🔹 маршрути */}
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ title: "Task Details" }} />
        <Stack.Screen name="edit/[id]" options={{ title: "Edit" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}


