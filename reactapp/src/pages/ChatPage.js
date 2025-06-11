import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Header from "../components/Header";
import Message from "../components/Message";
import { useAuth } from "../AuthContext";

const socket = io.connect("http://localhost:3001",{
  cors: { origin: '*' }
});

function Chat() {
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { userInfo } = useAuth();

  useEffect(() => {
    //서버 -> 클라이언트 전송
    socket.on("srvMsg", (msg) => {
      setMessages((prev) => [...prev, msg]);

      // 스크롤 맨 아래로
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 0);
    });

    return () => socket.off("srvMsg");
  }, []);


  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgObj = {
      writer: userInfo.name,
      txt: message,
      color: "a78bfa", 
    };

    // 클라이언트 -> 서버 전송
    socket.emit("cliMsg", msgObj); 
    setMessage("");
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
            💬 실시간 채팅
          </h2>

          <div
            ref={chatRef}
            className="p-4 space-y-2 overflow-auto h-[60vh] bg-gray-100 rounded-lg mb-4"
            id="chatArea"
          >
            {messages.map((msg, index) => (
              <Message
                key={index}
                writer={msg.writer}
                text={msg.txt}
                color={msg.color}
                isMine={msg.writer === userInfo.name}
              />
            ))}
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
