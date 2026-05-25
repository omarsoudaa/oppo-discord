import { useState } from "react";
import api from "../api/axios.js";

function Register({ onRegister, onGoToLogin }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/register", form);
      onRegister(data);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Create account</h1>
        <p>Pick a username and join the conversation.</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-box">{error}</div>}

          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="oppo_user"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="6"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <button onClick={onGoToLogin}>Log in</button>
        </p>
      </section>
    </main>
  );
}

export default Register;
