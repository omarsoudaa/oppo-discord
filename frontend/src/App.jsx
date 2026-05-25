import { useEffect, useState } from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
  const [page, setPage] = useState(() => (localStorage.getItem("token") ? "chat" : "login"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && page === "chat") {
      setPage("login");
    }
  }, [page]);

  const handleAuthSuccess = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setPage("chat");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage("login");
  };

  if (page === "register") {
    return <Register onRegister={handleAuthSuccess} onGoToLogin={() => setPage("login")} />;
  }

  if (page === "chat" && localStorage.getItem("token")) {
    return <Chat user={user} onLogout={handleLogout} />;
  }

  return <Login onLogin={handleAuthSuccess} onGoToRegister={() => setPage("register")} />;
}

export default App;
