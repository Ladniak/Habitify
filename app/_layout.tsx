import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { ThemeProvider, useTheme } from "../theme/themes";

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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ title: "Task Details" }} />
        <Stack.Screen name="edit/[id]" options={{ title: "Edit" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
