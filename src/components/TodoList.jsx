import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo } from "../services/api";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

export default function TodoList({ token }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getTodos(token);

        const todosArray = Array.isArray(data)
          ? data
          : Array.isArray(data.todos)
          ? data.todos
          : [];

        setTodos(todosArray);
      } catch (err) {
        console.error("Erro ao buscar todos:", err);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, [token]);

  async function addTodo(todoData) {
    const newTodo = await createTodo(todoData, token);
    setTodos([...todos, newTodo]);
  }

  async function removeTodo(id) {
    await deleteTodo(id, token);
    setTodos(todos.filter((t) => t.id !== id));
  }

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-6">
        Carregando tarefas...
      </p>
    );

  return (
    <div className="max-w-md mx-auto px-4">
      <TodoForm onAdd={addTodo} />

      <ul className="mt-6 flex flex-col gap-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            Nenhuma tarefa ainda.
          </p>
        ) : (
          todos.map((t) => (
            <TodoItem key={t.id} todo={t} onDelete={removeTodo} />
          ))
        )}
      </ul>
    </div>
  );
}
