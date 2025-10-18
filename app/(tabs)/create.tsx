import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { AppDispatch } from "@/redux/store";
import { addTask } from "@/redux/tasksSlice";
import { useTheme } from "../theme/themes";
import Input from "../components/Input";
import Button from "../components/Button";
import { Picker } from "@react-native-picker/picker";

export default function CreateTask() {
    const { colors } = useTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Work");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
    const [dueDate, setDueDate] = useState<number | null>(null);
    const icon = "doc.text.fill";

    const handleAdd = async () => {
        if (!title.trim()) return Alert.alert("Error", "Task title cannot be empty");

        try {
            await dispatch(
                addTask({ title, description, category, priority, dueDate })
            ).unwrap();
            router.back();
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Could not add task");
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>

                <Text style={[styles.label, { color: colors.text }]}>Title:</Text>
                <Input
                    placeholder="Enter"
                    value={title}
                    icon={icon}
                    onChangeText={setTitle}
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
                    placeholderTextColor={colors.subtext}
                />

                <Text style={[styles.label, { color: colors.text }]}>Description:</Text>
                <Input
                    placeholder="Enter"
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
                    <Button title="Save" onPress={handleAdd} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
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
