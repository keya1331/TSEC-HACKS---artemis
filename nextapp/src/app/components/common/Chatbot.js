'use client'
import React, { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/api/generate", {
        prompt: userInput,
      });

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage = { role: "bot", content: "" };
      setMessages((prev) => [...prev, botMessage]);

      const words = data.response.split(" ");
      let index = 0;

      const typingInterval = setInterval(() => {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          if (index < words.length) {
            updatedMessages[updatedMessages.length - 1].content += (index > 0 ? " " : "") + words[index];
            index++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
          }
          return updatedMessages;
        });
      }, 200); 
    } catch (error) {
      console.error("Error communicating with the server:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error: Unable to get a response." },
      ]);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
        onClick={openModal}
      >
        Chat
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white w-full max-w-md rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Chat with Us</h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <div className="h-80 overflow-y-auto border border-gray-600 rounded-lg p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex">
              <input
                type="text"
                className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}