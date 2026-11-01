import { Stack } from "expo-router";
import { TodoProvider } from "../context/TodoContext";

export default function RootLayout() {
  return (
    <TodoProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Min Todo-lista" }} />

        <Stack.Screen name="todo/[id]" options={{ title: "Todo-detaljer" }} />

        <Stack.Screen
          name="add"
          options={{
            title: "Lägg till uppgift",
            presentation: "modal",
          }}
        />
      </Stack>
    </TodoProvider>
  );
}
