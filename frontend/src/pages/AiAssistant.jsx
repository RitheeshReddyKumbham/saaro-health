import React, { useState } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    {
      from: "doctor",
      name: "Dr. Ethan Carter",
      avatar: "/images/doctor-avatar.png",
      text: "What",
    },
    {
      from: "ai",
      name: "AI",
      avatar: "/images/ai-icon.png",
      text: "Common symptoms of the flu include",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      from: "doctor",
      name: "Dr. Ethan Carter",
      avatar: "/images/doctor-avatar.png",
      text: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-screen">
      <div className="w-[250px] flex-shrink-0">
        <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
          <div className="flex flex-col h-screen bg-[#fafafa]">
            <div className="text-center py-6 font-bold text-2xl text-gray-900">
              AI Assistant
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 space-y-6">
              {messages.map((msg, idx) => (
                msg.from === "doctor" ? (
                  <div key={idx} className="self-end text-right">
                    <p className="text-xs text-purple-600 font-medium mb-1">{msg.name}</p>
                    <div className="flex items-center gap-2 justify-end">
                      <div className="bg-[#7a4de6] text-white px-4 py-2 rounded-2xl text-sm font-medium max-w-xs">
                        {msg.text}
                      </div>
                      <img src={msg.avatar} alt={msg.name} className="w-8 h-8 rounded-full" />
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="flex items-start gap-2">
                    <img src={msg.avatar} alt={msg.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-xs text-purple-600 font-medium mb-1">{msg.name}</p>
                      <div className="bg-[#eeeafc] px-4 py-2 rounded-2xl text-sm text-gray-800 max-w-[75%]">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Chat Input */}
            <div className="px-4 py-4 border-t bg-[#f4f2fa]">
              <div className="flex items-center bg-[#e8e3f3] px-4 py-3 rounded-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Chat with me..."
                  className="flex-1 bg-transparent focus:outline-none text-purple-700 text-sm"
                />
                <button className="text-purple-600 hover:text-purple-800 mr-2">
                  📎
                </button>
                <button
                  onClick={handleSend}
                  className="bg-[#7a4de6] text-white px-5 py-1.5 rounded-full text-sm font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
};

export default AiAssistant;
