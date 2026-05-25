import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import api from "../api/axios.js";
import Sidebar from "../components/Sidebar.jsx";
import MessageList from "../components/MessageList.jsx";
import MessageInput from "../components/MessageInput.jsx";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

function Chat({ user, onLogout }) {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const selectedChannelRef = useRef(selectedChannel);

  useEffect(() => {
    selectedChannelRef.current = selectedChannel;
  }, [selectedChannel]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io(socketUrl, {
      auth: { token }
    });

    socketRef.current = socket;

    socket.on("connect_error", () => {
      setError("Could not connect to chat server");
    });

    socket.on("receiveMessage", (message) => {
      setMessages((currentMessages) => {
        if (message.channel !== selectedChannelRef.current) {
          return currentMessages;
        }

        return [...currentMessages, message];
      });
    });

    socket.on("socketError", (message) => {
      setError(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get(`/messages/${selectedChannel}`);
        setMessages(data);
        socketRef.current?.emit("joinChannel", selectedChannel);
      } catch (error) {
        setError(error.response?.data?.message || "Could not load messages");
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedChannel]);

  const handleSendMessage = (text) => {
    socketRef.current?.emit("sendMessage", {
      channel: selectedChannel,
      text
    });
  };

  return (
    <main className="chat-shell">
      <Sidebar
        selectedChannel={selectedChannel}
        onSelectChannel={setSelectedChannel}
        user={user}
        onLogout={onLogout}
      />

      <section className="chat-main">
        <header className="chat-header">
          <div>
            <span className="channel-prefix">#</span>
            <h1>{selectedChannel}</h1>
          </div>
        </header>

        {error && <div className="chat-error">{error}</div>}
        <MessageList messages={messages} loading={loading} currentUserId={user?.id} />
        <MessageInput onSendMessage={handleSendMessage} />
      </section>
    </main>
  );
}

export default Chat;
