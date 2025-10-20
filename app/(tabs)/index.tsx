import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTasks } from "@/redux/tasksSlice";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../theme/themes";
import Button from "../components/Button";
import Card from "../components/Card";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const icon = "plus.circle.fill";

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const categoryMatch = categoryFilter === "All" || task.category === categoryFilter;
      const priorityMatch = priorityFilter === "All" || task.priority === priorityFilter;
      const statusMatch =
        statusFilter === "All" ||
        (statusFilter === "Done" ? task.completed : !task.completed);
      return categoryMatch && priorityMatch && statusMatch;
    });
  }, [tasks, categoryFilter, priorityFilter, statusFilter]);

  if (loading) return <Text style={{ color: colors.text, padding: 20 }}>Loading...</Text>;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filters}>
        <Picker
          selectedValue={categoryFilter}
          onValueChange={(val) => setCategoryFilter(val)}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.text}
        >
          <Picker.Item label="All Categories" value="All" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        <Picker
          selectedValue={priorityFilter}
          onValueChange={(val) => setPriorityFilter(val)}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.text}
        >
          <Picker.Item label="All Priorities" value="All" />
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>

        <Picker
          selectedValue={statusFilter}
          onValueChange={(val) => setStatusFilter(val)}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.text}
        >
          <Picker.Item label="All Status" value="All" />
          <Picker.Item label="Done" value="Done" />
          <Picker.Item label="In Progress" value="InProgress" />
        </Picker>
      </View>

      <FlatList
        data={filteredTasks}
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
  container: { flex: 1, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 },
  filters: {
    marginBottom: 12,
    gap: 8,
  },
  picker: {
    height: Platform.OS === "ios" ? 100 : 50,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
});
