"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([
        {
          sender: "bot",
          text: "Olá! Como posso te ajudar a saber mais sobre o Claudemir?",
        },
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: inputValue }];
    setMessages(newMessages);
    const question = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from the bot.");
      }

      const { answer } = await res.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: answer },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Desculpe, algo deu errado. Tente novamente mais tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-16 h-16"
        onClick={toggleChat}
      >
        <Send className="h-8 w-8" />
      </Button>
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-gray-200 text-black"
                    : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="my-2 p-2 rounded-lg bg-gray-200 text-black">
                Digitando...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2 text-black"
              placeholder="Digite sua pergunta..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <Button
              className="ml-2"
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              <Send />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
