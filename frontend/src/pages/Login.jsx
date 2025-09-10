import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/auth/login", form);
    localStorage.setItem("token", res.data.token);
    alert("Login successful!");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2"/>
        <button type="submit" className="bg-green-500 text-white p-2">Login</button>
      </form>
    </div>
  );
}

export default Login;

