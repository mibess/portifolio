"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
          text: "Vamos conhecer um pouco mais do Claudemir?",
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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {!isOpen && (
          <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-800 shadow-lg border border-slate-200">
            Fale com o Mibee
          </div>
        )}
        <Button
          className="relative h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-[0_15px_35px_rgba(16,185,129,0.35)] transition duration-200 ease-out hover:scale-105 hover:shadow-[0_20px_45px_rgba(15,118,110,0.45)] cursor-pointer"
          onClick={toggleChat}
          aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
          size="icon"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-300 opacity-30 blur-lg animate-pulse pointer-events-none" />
          <Bot className="relative h-10 w-10" />
        </Button>
      </div>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[420px] h-[520px] sm:w-[360px] sm:max-w-none md:w-[420px] bg-white rounded-xl shadow-2xl flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold text-black">Mibee</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="cursor-pointer">
              <X className="h-6 w-6 text-black" />
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-7">
            <div className="mb-1 flex flex-col items-center text-center text-black">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg">
                <Bot className="relative h-8 w-8" />
              </div>
              <div className="text-lg font-semibold">
                Olá <span role="img" aria-label="mão acenando">👋</span>
              </div>
              <div className="text-sm text-slate-600">
                Como posso te ajudar hoje?
              </div>
            </div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-gray-200 text-black"
                    : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex w-fit items-center gap-1 rounded-lg bg-gray-200 px-3 py-2 text-slate-700">
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.2s]" />
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce [animation-delay:0s]" />
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce [animation-delay:0.2s]" />
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
              className="ml-2 h-10 px-4 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold shadow-[0_8px_20px_rgba(16,185,129,0.35)] transition hover:shadow-[0_10px_24px_rgba(15,118,110,0.4)] hover:brightness-105 disabled:opacity-60 cursor-pointer"
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
