import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";
import Card from "../components/Card";
import Button from "../components/Button";
import { useTheme } from "../theme/themes";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => router.push(`/details/${item.id}`)}>
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {item.title}
            </Text>
            <Text style={{ color: colors.subtext, marginTop: 4 }}>
              {item.completed ? "✅ Done" : "🕓 In Progress"}
            </Text>
          </Card>
        )}
      />
      <Link href="/create" asChild>
        <Button title="Add Task" onPress={() => { }} />
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "700" },
  iconButton: {
    padding: 6,
    borderRadius: 12,
  },
});
