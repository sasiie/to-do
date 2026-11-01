import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useTodos } from "../context/TodoContext";

export default function AddScreen() {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();

  const handleSave = () => {
    if (!title.trim()) return;

    addTodo(title);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      testID="add-screen"
    >
      <Text style={styles.heading}>Ny uppgift 📝</Text>

      <TextInput
        style={styles.input}
        placeholder="Vad behöver du göra?"
        value={title}
        onChangeText={setTitle}
        autoFocus
        testID="todo-input"
      />

      <Pressable
        style={[styles.saveButton, !title.trim() && styles.disabledButton]}
        onPress={handleSave}
        disabled={!title.trim()}
        testID="save-todo"
      >
        <Text style={styles.buttonText}>Spara</Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={() => router.back()}
        testID="cancel-add"
      >
        <Text style={styles.cancelText}>Avbryt</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 18,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: "#93c5fd",
  },
  cancelButton: {
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelText: {
    color: "#2563eb",
    fontSize: 16,
  },
});
