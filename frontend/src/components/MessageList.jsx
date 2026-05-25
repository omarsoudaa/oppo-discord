function MessageList({ messages, loading, currentUserId }) {
  if (loading) {
    return <div className="message-list status-message">Loading messages...</div>;
  }

  if (messages.length === 0) {
    return <div className="message-list status-message">No messages yet. Start the chat!</div>;
  }

  return (
    <div className="message-list">
      {messages.map((message) => {
        const isMine = message.user === currentUserId;
        const time = new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

        return (
          <article key={message._id} className={`message ${isMine ? "mine" : ""}`}>
            <div className="avatar">{message.username.charAt(0).toUpperCase()}</div>
            <div className="message-body">
              <div className="message-meta">
                <strong>{message.username}</strong>
                <span>{time}</span>
              </div>
              <p>{message.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default MessageList;
