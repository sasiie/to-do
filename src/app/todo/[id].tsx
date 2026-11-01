import { Stack, router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useTodos } from "../../context/TodoContext";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { todos, toggleTodo, deleteTodo } = useTodos();

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Uppgiften hittades inte</Text>

        <Pressable onPress={() => router.replace("/")}>
          <Text style={styles.link}>Tillbaka till startsidan</Text>
        </Pressable>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert("Ta bort uppgift", "Är du säker på att du vill ta bort den?", [
      { text: "Avbryt", style: "cancel" },
      {
        text: "Ta bort",
        style: "destructive",
        onPress: () => {
          deleteTodo(todo.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container} testID="detail-screen">
      <Stack.Screen options={{ title: "Todo-detaljer" }} />

      <Text style={styles.title} testID="todo-title">
        {todo.title}
      </Text>

      <Text style={styles.status} testID="todo-status">
        {todo.completed ? "Genomförd" : "Ej genomförd"}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => toggleTodo(todo.id)}
        testID="toggle-todo"
      >
        <Text style={styles.buttonText}>
          {todo.completed ? "Markera som inte klar" : "Markera som klar"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={handleDelete}
        testID="delete-todo"
      >
        <Text style={styles.buttonText}>Ta bort uppgift</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#2563eb",
    fontSize: 16,
  },
});
