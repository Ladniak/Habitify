import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../theme/themes";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Button from "../components/Button";
import { fetchTaskById, toggleTaskStatus, deleteTask } from "@/redux/tasksSlice";
import { RootState, AppDispatch } from "@/redux/store";

export default function TaskDetails() {
    const { id } = useLocalSearchParams();
    const { colors } = useTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedTask: task, loading } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        if (id) dispatch(fetchTaskById(id as string));
    }, [id]);

    const toggleStatus = async () => {
        if (!task) return;
        await dispatch(toggleTaskStatus(task));
    };

    const handleDelete = async () => {
        if (!task) return;
        Alert.alert("Delete Task", "Are you sure?", [
            { text: "Cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await dispatch(deleteTask(task.id));
                    router.back();
                },
            },
        ]);
    };

    if (loading || !task)
        return <Text style={{ color: colors.text, padding: 20 }}>Loading...</Text>;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>

            {task.description ? (
                <Text style={[styles.text, { color: colors.subtext }]}>{task.description}</Text>
            ) : null}

            <View style={styles.row}>
                <Text style={[styles.label, { color: colors.subtext }]}>Status:</Text>
                {task.completed ? (
                    <IconSymbol size={26} name="checkmark.circle.fill" color={colors.text} />
                ) : (
                    <IconSymbol size={26} name="speedometer" color={colors.text} />
                )}
            </View>

            {task.category && (
                <View style={styles.row}>
                    <Text style={[styles.label, { color: colors.subtext }]}>Category:</Text>
                    <Text style={[styles.text, { color: colors.text }]}>{task.category}</Text>
                </View>
            )}

            {task.priority && (
                <View style={styles.row}>
                    <Text style={[styles.label, { color: colors.subtext }]}>Priority:</Text>
                    <Text style={[styles.text, { color: colors.text }]}>{task.priority}</Text>
                </View>
            )}

            {task.dueDate && (
                <View style={styles.row}>
                    <Text style={[styles.label, { color: colors.subtext }]}>Due Date:</Text>
                    <Text style={[styles.text, { color: colors.text }]}>
                        {new Date(task.dueDate).toLocaleDateString()}
                    </Text>
                </View>
            )}

            <Button
                title={task.completed ? "Mark as Incomplete" : "Mark as Done"}
                onPress={toggleStatus}
            />
            <Button title="Delete" onPress={handleDelete} color={colors.danger} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    title: { fontSize: 26, fontWeight: "700" },
    text: { fontSize: 16 },
    label: { fontSize: 16, marginRight: 8 },
    row: { flexDirection: "row", alignItems: "center", marginBottom: 12, gap: 8 },
});
