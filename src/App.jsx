import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./components/TodoList";
import { logout } from "./services/auth";

export default function App() {
  // Token guardado no navegador
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  // Controla qual página mostrar
  const [page, setPage] = useState(token ? "todos" : "login");

  // Quando o login é bem-sucedido
  function handleLogin(token) {
    setToken(token);
    setPage("todos");
  }
  
  // Logout
  async function handleLogout() {
    try {
      await fetch("http://localhost:8000/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (_) {
      console.error("Erro ao fazer logout no backend");
    }
    logout();
    setToken(null);
    setPage("login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* LOGIN */}
      {page === "login" && (
        <Login
          onLogin={handleLogin}
          onGoToRegister={() => setPage("register")}
        />
      )}

      {/* REGISTER */}
      {page === "register" && (
        <Register
          onRegister={() => setPage("login")}
          onGoToLogin={() => setPage("login")}
        />
      )}

      {/* TODO LIST */}
      {page === "todos" && token && (
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </div>

          <TodoList token={token} />
        </div>
      )}
    </div>
  );
}
