import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme/themes";

export default function Button({ title, onPress, color }: { title: string; onPress: () => void; color?: string }) {
    const { colors } = useTheme();

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor: color || colors.primary, shadowColor: colors.shadow },
            ]}
            onPress={onPress}
        >
            <Text style={[styles.text, { color: "#fff" }]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    text: { fontSize: 16, fontWeight: "600" },
});
