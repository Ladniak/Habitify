import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/redux/tasksSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Card from "../components/Card";
import Button from "../components/Button";
import { useTheme } from "../theme/themes";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const icon = "plus.circle.fill";

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <Text style={{ color: colors.text, padding: 20 }}>Loading...</Text>;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => router.push(`/details/${item.id}`)}>
            <Text style={{ color: colors.text, fontSize: 16 }}>{item.title}</Text>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, gap: 6 }}>
              {item.completed ? (
                <>
                  <IconSymbol size={20} name="checkmark.circle.fill" color="#22c55e" />
                  <Text style={{ color: colors.subtext }}>Done</Text>
                </>
              ) : (
                <>
                  <IconSymbol size={20} name="speedometer" color="#3b82f6" />
                  <Text style={{ color: colors.subtext }}>In Progress</Text>
                </>
              )}
            </View>
          </Card>
        )}
      />

      <Link href="/create" asChild>
        <Button icon={icon} title="Add Task" onPress={() => { }} />
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "700" },
  iconButton: {
    padding: 6,
    borderRadius: 12,
  },
});
