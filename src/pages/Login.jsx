import { useState } from "react";
import { login } from "../services/auth";

export default function Login({ onLogin, onGoToRegister, onGoToRecover }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const token = await login(email, password);

      if (!token) {
        setError("Credenciais inválidas");
        return;
      }

      onLogin(token);
    } catch {
      setError("Credenciais inválidas");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xs sm:max-w-sm bg-white shadow-md rounded-xl p-6">

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg
                       text-sm sm:text-base transition-colors"
          >
            Entrar
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-4 text-sm">
            {error}
          </p>
        )}

        {/* 🔥 Esqueci minha senha */}
        <p className="text-center text-sm text-sky-600 mt-4 hover:underline cursor-pointer"
           onClick={onGoToRecover}>
          Esqueci minha senha
        </p>

        {/* 🔥 Criar conta */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Não tem conta?
          <button
            onClick={onGoToRegister}
            className="text-sky-600 font-medium ml-1 hover:underline"
          >
            Criar conta
          </button>
        </p>

      </div>
    </div>
  );
}
