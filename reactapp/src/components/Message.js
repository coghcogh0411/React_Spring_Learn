const Message = ({ writer, text, color, isMine }) => {
  const backgroundColor = `#${color}BB`;

  return (
    <div
      className={`w-full flex ${isMine ? "justify-end" : "justify-start"} my-2`}
    >
      <div
        className="rounded-xl p-4 max-w-[70%] shadow"
        style={{ backgroundColor }}
      >
        <div className="text-xs text-gray-500 mb-1">{writer}</div>
        <div className="text-sm whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  );
};

export default Message;
