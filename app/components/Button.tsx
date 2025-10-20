import { IconSymbol } from "@/components/ui/icon-symbol";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/themes";

export default function Button({ title, icon, onPress, color }: { title: string; icon?: string; onPress: () => void; color?: string }) {
    const { colors } = useTheme();

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor: color || colors.primary, shadowColor: colors.shadow },
            ]}
            onPress={onPress}
        >

            <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                <Text style={[styles.text, { color: "#fff" }]}>{title}</Text>
                {icon && <IconSymbol size={26} name={icon as any} color="#fff" />}
            </View>

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
