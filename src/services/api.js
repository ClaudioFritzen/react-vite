
const API_URL = "http://127.0.0.1:8000";

export async function getTodos(token) {
  const res = await fetch(`${API_URL}/todos/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function createTodo(todoData, token) {
  const res = await fetch(`${API_URL}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: todoData.title,
      description: todoData.description,
      state: todoData.state,
     }),
  });
  return res.json();
}

export async function deleteTodo(id, token) {
  await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


/* '''usada para testar a conexão com o backend''' 
export async function healthcheck() {
  const res = await fetch("http://127.0.0.1:8000/");
  return res.json();
}
*/