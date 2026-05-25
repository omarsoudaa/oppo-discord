require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Message = require("./models/Message");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const channels = ["general", "study", "tech", "random"];

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "oppo-discord API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Socket authentication failed"));
  }
});

io.on("connection", (socket) => {
  socket.on("joinChannel", (channel) => {
    if (!channels.includes(channel)) {
      socket.emit("socketError", "Invalid channel");
      return;
    }

    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    socket.join(channel);
  });

  socket.on("sendMessage", async ({ channel, text }) => {
    try {
      if (!channels.includes(channel)) {
        socket.emit("socketError", "Invalid channel");
        return;
      }

      if (!text || !text.trim()) {
        socket.emit("socketError", "Message cannot be empty");
        return;
      }

      const message = await Message.create({
        user: socket.user._id,
        username: socket.user.username,
        channel,
        text: text.trim()
      });

      io.to(channel).emit("receiveMessage", message);
    } catch (error) {
      socket.emit("socketError", "Message could not be sent");
    }
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
