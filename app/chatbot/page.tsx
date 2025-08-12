"use client";

import { useState } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: input }]);

    // Send to API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // Add bot reply
    setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-auto border p-2 mb-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "user" ? "text-right" : "text-left"}>
            <span className={`inline-block p-2 rounded ${m.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-green-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
