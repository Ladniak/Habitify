import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../theme/themes";

interface CardProps {
    children: ReactNode;
    onPress?: () => void;
}

export default function Card({ children, onPress }: CardProps) {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                { backgroundColor: colors.card, opacity: pressed ? 0.9 : 1 },
            ]}
        >
            <View>{children}</View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        elevation: 2,
    },
});

