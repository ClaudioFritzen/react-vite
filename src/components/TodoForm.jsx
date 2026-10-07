import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("draft");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ title, description, state });

    setTitle("");
    setDescription("");
    setState("draft");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white shadow-md rounded-xl p-6 max-w-sm mx-auto mt-6"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da tarefa"
        className="border border-gray-300 rounded-lg py-2 px-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição (opcional)"
        rows={3}
        className="border border-gray-300 rounded-lg py-2 px-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="border border-gray-300 rounded-lg py-2 px-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option value="draft">Rascunho</option>
        <option value="todo">A fazer</option>
        <option value="doing">Fazendo</option>
        <option value="done">Concluído</option>
      </select>

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg
                   text-sm transition-colors"
      >
        Adicionar
      </button>
    </form>
  );
}
