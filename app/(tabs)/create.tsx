import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { AppDispatch } from "@/redux/store";
import { addTask } from "@/redux/tasksSlice";
import { useTheme } from "../theme/themes";
import Input from "../components/Input";
import Button from "../components/Button";

export default function CreateTask() {
    const { colors } = useTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState("");
    const icon = "doc.text.fill";

    const handleAdd = async () => {
        if (!title.trim()) return Alert.alert("Error", "Task title cannot be empty");

        try {
            await dispatch(addTask(title)).unwrap();
            router.back();
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Could not add task");
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Input placeholder="Enter task title" value={title} icon={icon} onChangeText={setTitle} />
                <Button title="Save" onPress={handleAdd} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    title: { fontSize: 26, fontWeight: "700" },
});
