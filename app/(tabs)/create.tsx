import { db } from "@/firebase/config";
import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "../components/Input";
import { useTheme } from "../theme/themes";

export default function CreateTask() {
    const { colors } = useTheme();
    const router = useRouter();
    const [title, setTitle] = useState("");

    const handleAdd = async () => {
        if (!title.trim()) return Alert.alert("Error", "Task title cannot be empty");

        try {
            await addDoc(collection(db, "tasks"), {
                title,
                completed: false,
                createdAt: serverTimestamp(),
            });
            router.back();
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Could not add task");
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Input placeholder="Enter task title" value={title} onChangeText={setTitle} />
                <Button title="Save" onPress={handleAdd} />
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    title: { fontSize: 26, fontWeight: "700" },
});
