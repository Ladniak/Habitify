import { useLocalSearchParams, useRouter } from "expo-router";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebase/config";
import Button from "../components/Button";
import { useTheme } from "../theme/themes";

export default function TaskDetails() {
    const { colors } = useTheme();
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [task, setTask] = useState<any>(null);

    useEffect(() => {
        const fetchTask = async () => {
            const docRef = doc(db, "tasks", id as string);
            const snap = await getDoc(docRef);
            if (snap.exists()) setTask({ id: snap.id, ...snap.data() });
        };
        fetchTask();
    }, [id]);

    const toggleStatus = async () => {
        if (!task) return;
        await updateDoc(doc(db, "tasks", task.id), { completed: !task.completed });
        setTask({ ...task, completed: !task.completed });
    };

    const handleDelete = async () => {
        Alert.alert("Delete Task", "Are you sure?", [
            { text: "Cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await deleteDoc(doc(db, "tasks", task.id));
                    router.back();
                },
            },
        ]);
    };

    if (!task) return <Text>Loading...</Text>;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
            <Text style={{ color: colors.subtext, marginBottom: 20 }}>
                Status: {task.completed ? "✅ Done" : "🕓 In Progress"}
            </Text>

            <Button title={task.completed ? "Mark as Incomplete" : "Mark as Done"} onPress={toggleStatus} />
            <Button title="Delete" onPress={handleDelete} color={colors.danger} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    title: { fontSize: 26, fontWeight: "700" },
});
