import { useState } from "react";
import { api } from "../api";

const Signup = ({ onSwitch }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    await api.post("/auth/signup", form);
    alert("Signup successful. Please login.");
    onSwitch();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Create Account</h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white"
          />
          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white"
          />
        </div>

        <button
          onClick={signup}
          className="w-full mt-6 py-3 bg-primary hover:bg-rose-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/30"
        >
          Create Account
        </button>

        <p
          onClick={onSwitch}
          className="mt-6 text-center text-sm text-slate-500 hover:text-primary cursor-pointer transition-colors"
        >
          Already have an account? <span className="font-semibold underline">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
