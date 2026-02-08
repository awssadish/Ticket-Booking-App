import { useState } from "react";
import { api } from "../api";

const Login = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // store auth info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userName", res.data.name);

      onLogin();
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Server error. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Welcome Back</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white"
          />
        </div>

        {error && <p className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center border border-red-100">{error}</p>}

        <button
          onClick={login}
          className="w-full mt-6 py-3 bg-primary hover:bg-rose-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/30"
        >
          Login
        </button>

        <p
          onClick={onSwitch}
          className="mt-6 text-center text-sm text-slate-500 hover:text-primary cursor-pointer transition-colors"
        >
          Don’t have an account? <span className="font-semibold underline">Signup</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
