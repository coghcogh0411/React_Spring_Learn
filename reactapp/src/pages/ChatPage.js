import { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "../components/Header";

const socket = io("http://localhost:3001");

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => socket.off("chat message");
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
            💬 실시간 채팅
          </h2>

          <div className="h-64 overflow-y-auto border rounded-xl p-4 bg-gray-50 mb-4 shadow-inner">
            {chat.length === 0 ? (
              <p className="text-gray-400 text-center">채팅이 없습니다.</p>
            ) : (
              chat.map((msg, idx) => (
                <div
                  key={idx}
                  className="mb-2 p-2 bg-purple-100 rounded-xl w-fit max-w-xs"
                >
                  {msg}
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="메시지를 입력하세요"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
