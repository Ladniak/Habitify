import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "../theme/themes";

export default function Input({ value, onChangeText, placeholder }: any) {
    const { colors } = useTheme();

    return (
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                },
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.subtext}
            value={value}
            onChangeText={onChangeText}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
    },
});
