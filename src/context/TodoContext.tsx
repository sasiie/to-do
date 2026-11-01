import { createContext, ReactNode, useContext, useState } from "react";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Handla mat", completed: false },
    { id: "2", title: "Plugga React Native", completed: false },
    { id: "3", title: "Träna", completed: true },
  ]);

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: trimmedTitle,
      completed: false,
    };

    setTodos((previousTodos) => [...previousTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodos måste användas inom TodoProvider");
  }

  return context;
}
