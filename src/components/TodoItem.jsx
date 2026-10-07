export default function TodoItem({ todo, onDelete }) {
  const stateColors = {
    draft: "text-gray-500",
    todo: "text-sky-600",
    doing: "text-yellow-600",
    done: "text-green-600",
  };

  return (
    <li className="flex justify-between items-start bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex-1">
        <strong className={`block ${stateColors[todo.state]} mb-1`}>
          {todo.title}
        </strong>

        {todo.description && (
          <p className="text-gray-600 text-sm leading-snug">
            {todo.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg text-sm ml-4"
      >
        X
      </button>
    </li>
  );
}
