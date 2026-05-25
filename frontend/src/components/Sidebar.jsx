const channels = ["general", "study", "tech", "random"];

function Sidebar({ selectedChannel, onSelectChannel, user, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="server-title">
        <span className="server-icon">O</span>
        <div>
          <strong>oppo-discord</strong>
        </div>
      </div>

      <nav className="channel-list" aria-label="Channels">
        <p>Channels</p>
        {channels.map((channel) => (
          <button
            key={channel}
            className={selectedChannel === channel ? "active" : ""}
            onClick={() => onSelectChannel(channel)}
          >
            <span>#</span>
            {channel}
          </button>
        ))}
      </nav>

      <div className="sidebar-user">
        <div>
          <strong>{user?.username || "Guest"}</strong>
          <small>Online</small>
        </div>
        <button onClick={onLogout}>Logout</button>
      </div>
    </aside>
  );
}

export default Sidebar;
