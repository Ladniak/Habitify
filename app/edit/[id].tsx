import { AppDispatch, RootState } from "@/redux/store";
import { fetchTaskById, updateTask } from "@/redux/tasksSlice";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../theme/themes";
import Button from "../components/Button";
import Input from "../components/Input";

export default function EditTask() {
    const { id } = useLocalSearchParams();
    const { colors } = useTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedTask: task, loading } = useSelector((state: RootState) => state.tasks);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Work");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

    useEffect(() => {
        if (id) dispatch(fetchTaskById(id as string));
    }, [id]);

    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
            setDescription(task.description || "");
            setCategory(task.category || "Work");
            setPriority(task.priority || "medium");
        }
    }, [task]);

    const handleUpdate = async () => {
        if (!task) return;
        if (!title.trim()) return Alert.alert("Error", "Task title cannot be empty");

        try {
            await dispatch(updateTask({ id: task.id, title, description, category, priority })).unwrap();
            router.back();
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Could not update task");
        }
    };

    if (loading || !task) {
        return <Text style={{ color: colors.text, padding: 20 }}>Loading...</Text>;
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

            <Text style={[styles.label, { color: colors.text }]}>Title:</Text>
            <Input
                placeholder="Enter task title"
                value={title}
                onChangeText={setTitle}
                style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                placeholderTextColor={colors.subtext}
            />

            <Text style={[styles.label, { color: colors.text }]}>Description:</Text>
            <Input
                placeholder="Enter task description"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                placeholderTextColor={colors.subtext}
            />

            <Text style={[styles.label, { color: colors.text }]}>Category:</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Picker
                    selectedValue={category}
                    onValueChange={(val) => setCategory(val)}
                    style={{ color: colors.text }}
                    dropdownIconColor={colors.text}
                >
                    <Picker.Item label="Work" value="Work" />
                    <Picker.Item label="Personal" value="Personal" />
                    <Picker.Item label="Shopping" value="Shopping" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
            </View>

            <Text style={[styles.label, { color: colors.text }]}>Priority:</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Picker
                    selectedValue={priority}
                    onValueChange={(val) => setPriority(val)}
                    style={{ color: colors.text }}
                    dropdownIconColor={colors.text}
                >
                    <Picker.Item label="Low" value="low" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="High" value="high" />
                </Picker>
            </View>

            <View style={{ marginTop: 30 }}>
                <Button title="Save Changes" onPress={handleUpdate} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    header: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
    input: {
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
    },
    label: {
        marginTop: 12,
        marginBottom: 4,
        fontSize: 14,
        fontWeight: "600",
    },
    pickerContainer: {
        borderRadius: 10,
        borderWidth: Platform.OS === "ios" ? 0 : 1,
        overflow: "hidden",
    },
});
