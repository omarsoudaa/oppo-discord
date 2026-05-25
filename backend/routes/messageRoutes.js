const express = require("express");
const Message = require("../models/Message");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
const channels = ["general", "study", "tech", "random"];

router.get("/:channel", protect, async (req, res) => {
  try {
    const { channel } = req.params;

    if (!channels.includes(channel)) {
      return res.status(400).json({ message: "Invalid channel" });
    }

    const messages = await Message.find({ channel })
      .sort({ createdAt: 1 })
      .limit(100);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Could not load messages" });
  }
});

module.exports = router;
