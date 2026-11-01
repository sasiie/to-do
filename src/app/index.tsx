import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTodos } from "../context/TodoContext";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const todos: Todo[] = [
  { id: "1", title: "Handla mat", completed: false },
  { id: "2", title: "Plugga React Native", completed: false },
  { id: "3", title: "Träna", completed: true },
];

export default function HomeScreen() {
  const { todos } = useTodos();

  return (
    <View style={styles.container} testID="home-screen">
      <Text style={styles.title}>Min Todo-lista 📝</Text>
      <Text>Här kommer dina uppgifter att visas!</Text>
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/add")}
        testID="add-todo"
      >
        <Text style={styles.addButtonText}>+ Lägg till uppgift</Text>
      </Pressable>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Inga uppgifter ännu!</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.todoItem}
            testID="todo-row"
            onPress={() =>
              router.push({
                pathname: "/todo/[id]",
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.todoText}>{item.title}</Text>
            <Text testID="todo-status">
              {item.completed ? "Genomförd" : "Ej genomförd"}
            </Text>
          </Pressable>
        )}
      />
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
  addButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  todoText: {
    fontSize: 18,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
});
