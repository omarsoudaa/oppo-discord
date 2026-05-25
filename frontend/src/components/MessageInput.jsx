import { useState } from "react";

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    onSendMessage(text);
    setText("");
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Message this channel"
        maxLength="1000"
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;
