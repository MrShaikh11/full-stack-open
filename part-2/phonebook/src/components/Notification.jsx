const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className="notification"
      style={{
        color: message.color,
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {message.msg}
    </div>
  );
};
export default Notification;
