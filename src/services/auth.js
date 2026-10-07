const API_URL = "http://localhost:8000";

export async function login(email, password) {
    console.log("📤 Enviando para o backend:", { email, password });

    const response = await fetch(`${API_URL}/auth/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    console.log("📥 Resposta bruta do backend:", response);
    if (!response.ok){
        const error = await response.json();
        console.log("❌ Erro recebido do backend:", error);
        throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("🔑 Token recebido:", data);
    if (!data.access_token) {
        console.error("Erro no backend: Token não retornado");
        throw new Error("Login failed: Token não retornado");
    }

    return data.access_token;
}

export async function registerUser({ username, email, password }) {
  const res = await fetch("http://127.0.0.1:8000/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Erro no backend:", error);
    throw new Error("Register failed");
  }

  return res.json();
}
