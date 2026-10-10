import { useState } from "react";

export default function EditTodoModal({
  todo,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description,
    state: todo.state,
  });

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...todo,
      ...formData,
    });
  }
  

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            Edit Todo
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="draft">Draft</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  
}