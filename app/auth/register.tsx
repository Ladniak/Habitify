import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter, Link } from "expo-router";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password || !confirm) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (password !== confirm) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.replace("/(tabs)");
        } catch (error: any) {
            Alert.alert("Registration failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Loading..." : "Register"}</Text>
            </TouchableOpacity>

            <Text style={styles.linkText}>
                Already have an account?{" "}
                <Link href="/auth/login" style={styles.link}>
                    Login
                </Link>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#4E75FF",
        borderRadius: 10,
        padding: 14,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
    linkText: {
        textAlign: "center",
        marginTop: 20,
    },
    link: {
        color: "#4E75FF",
        fontWeight: "600",
    },
});
