"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot, X, Copy, Check, ArrowDown, Cpu, Terminal, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  { label: "Experiência", text: "Qual é a experiência profissional do Claudemir?", tag: "XP" },
  { label: "Projetos", text: "Quais projetos o Claudemir desenvolveu?", tag: "PROJ" },
  { label: "Tech Stack", text: "Quais são as tecnologias favoritas do Claudemir?", tag: "SYS" },
  { label: "LigaPES", text: "Me fale sobre o LigaPES e o papel do Claudemir nele.", tag: "LIVE" },
  { label: "Hobbies", text: "Quais são os hobbies e interesses do Claudemir?", tag: "LIFE" },
  { label: "Formação", text: "Qual é a formação profissional do Claudemir?", tag: "EDU" },
];

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasModalClass = document.body.classList.contains("overflow-hidden");
      setIsModalOpen(hasModalClass && !isOpen);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const currentLocks = parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10);
    document.body.setAttribute("data-scroll-locks", String(currentLocks + 1));
    document.body.classList.add("overflow-hidden");

    return () => {
      const locks = parseInt(document.body.getAttribute("data-scroll-locks") || "0", 10);
      const newLocks = Math.max(0, locks - 1);
      if (newLocks === 0) {
        document.body.removeAttribute("data-scroll-locks");
        document.body.classList.remove("overflow-hidden");
      } else {
        document.body.setAttribute("data-scroll-locks", String(newLocks));
      }
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "Vamos conhecer um pouco mais do Claudemir? Selecione um dos tópicos abaixo ou digite sua pergunta.",
        },
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    if (scrollHeight - scrollTop - clientHeight > 150) {
      setShowScrollToBottom(true);
    } else {
      setShowScrollToBottom(false);
    }
  };

  const handleCopyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageIndex(index);
    setTimeout(() => setCopiedMessageIndex(null), 2000);
  };

  const handleSendMessage = async (textOverride?: string) => {
    const queryText = textOverride !== undefined ? textOverride : inputValue;
    if (queryText.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: queryText }];
    setMessages(newMessages);
    
    if (textOverride === undefined) {
      setInputValue("");
    }
    
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: queryText, history: messages }),
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
          text: "Desculpe, ocorreu um erro de conexão com o núcleo cerebral da IA. Tente retransmitir sua pergunta mais tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Terminal reiniciado. Selecione um dos tópicos abaixo ou digite sua pergunta.",
      },
    ]);
    setInputValue("");
    setIsLoading(false);
  };

  return (
    <>
      {/* Immersive Cyber Trigger Button */}
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 ${isModalOpen ? "hidden md:flex" : "flex"}`}>
        {!isOpen && (
          <div className="rounded-xl bg-[#00f3ff] border border-white text-[#0a0a0c] font-black shadow-[0_0_15px_rgba(0,243,255,0.5)] px-4 py-2 text-xs font-mono tracking-wider select-none animate-pulse">
            &gt; FALE_COM_MIBEE
          </div>
        )}
        <Button
          className="relative h-14 w-14 rounded-xl bg-white border-2 border-[#00f3ff] text-[#0a0a0c] shadow-[0_0_20px_rgba(0,243,255,0.35)] hover:shadow-[0_0_30px_rgba(0,243,255,0.65)] hover:border-[#bc13fe] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
          onClick={toggleChat}
          aria-label={isOpen ? "Fechar terminal de IA" : "Abrir terminal de IA"}
          size="icon"
        >
          <span className="absolute inset-0 rounded-xl bg-[#00f3ff]/15 opacity-30 blur-md pointer-events-none" />
          <Bot className="relative h-7 w-7 text-[#0a0a0c]" />
        </Button>
      </div>

      {isOpen && (
        <>
          {/* Mobile Backdrop Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Main Terminal Container */}
          <div
            className={`fixed z-50 flex flex-col transition-all duration-300 ease-out bg-[#0a0a0c]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,243,255,0.15)]
              /* Mobile bottom sheet */
              bottom-0 left-0 right-0 w-full h-[88dvh] rounded-t-3xl border-t border-x border-white/10
              pb-[safe-area-inset-bottom]
              
              /* Desktop floating terminal card */
              md:bottom-24 md:left-auto md:right-6 md:w-112 md:h-[600px] md:rounded-3xl md:border md:border-white/10
            `}
          >
            {/* Mobile swipe/close indicator bar */}
            <div 
              className="flex flex-col items-center pt-2 pb-1 md:hidden select-none cursor-pointer" 
              onClick={() => setIsOpen(false)}
            >
              <div className="w-12 h-1 bg-white/20 rounded-full hover:bg-white/40 transition-colors" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 font-mono">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-6 w-6 rounded bg-[#13131f] border border-[#00f3ff]/30 flex items-center justify-center">
                    <Terminal className="h-3.5 w-3.5 text-[#00f3ff]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#0aff0a] animate-ping" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#0aff0a] border border-[#0a0a0c]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold font-display text-gray-200 tracking-wider uppercase">
                    [ MIBEE // PORTFOLIO.SYS ]
                  </span>
                  <span className="text-[9px] text-[#00f3ff]/70 font-mono tracking-tight">STATUS: BRIDGE_ONLINE</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNewChat}
                  className="h-8 w-8 text-gray-400 hover:text-[#00f3ff] hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                  aria-label="Reiniciar terminal"
                  title="Reiniciar Terminal"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-gray-400 hover:text-[#00f3ff] hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                  aria-label="Encerrar conexão"
                  title="Encerrar terminal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Scrollable conversation view */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-5 scrollbar-thin scrollbar-thumb-[#00f3ff]/20 scrollbar-track-transparent"
            >
              {/* Boot sequence welcome card */}
              <div className="flex flex-col gap-4 p-4 border border-white/10 rounded-2xl bg-[#13131f]/40 backdrop-blur-md font-mono text-xs text-gray-300">
                <div className="flex justify-between items-center text-[9px] text-gray-500 border-b border-white/5 pb-2">
                  <span>[SYSTEM_SHELL_INIT: LEVEL_1]</span>
                  <span>v2.5.0</span>
                </div>
                <div className="space-y-1">
                  <p className="text-[#00f3ff] font-bold font-display text-sm tracking-wider">MIBEE_OS.sh()</p>
                  <p className="text-gray-500">Copyright (c) 2026 Mibess. All rights reserved.</p>
                </div>
                <div className="space-y-1 border-l border-[#00f3ff]/20 pl-3 text-gray-400">
                  <p><span className="text-[#00f3ff]">&gt;</span> INITIALIZING ASSISTANT CORE...</p>
                  <p className="text-[#0aff0a]"><span className="text-[#00f3ff]">&gt;</span> STATUS: CONNECTED_TO_KNOWLEDGE_CORE</p>
                  <p className="text-[#bc13fe]"><span className="text-[#00f3ff]">&gt;</span> COGNITIVE_BRIDGE: ONLINE</p>
                </div>
                <div className="text-sm text-gray-300 leading-relaxed font-sans mt-1">
                  Olá! Eu sou o <span className="text-[#00f3ff] font-bold font-display">Mibee</span>, o agente cognitivo do Claudemir.
                  Tenho acesso completo à sua biografia, projetos e competências técnicas.
                  Como posso te apoiar hoje?
                </div>
              </div>

              {/* Suggestions chips */}
              {messages.filter(m => m.sender === 'user').length === 0 && (
                <div className="flex flex-col gap-2 p-1">
                  <span className="text-[10px] font-mono text-gray-500 tracking-wider select-none px-1">
                    &gt; SELECIONE UMA CONSULTA DE ATALHO:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {SUGGESTIONS.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip.text)}
                        className="p-2 rounded-xl border border-[#00f3ff]/20 bg-[#00f3ff]/5 hover:bg-[#00f3ff]/10 hover:border-[#00f3ff]/50 hover:text-[#00f3ff] hover:shadow-[0_0_10px_rgba(0,243,255,0.1)] text-[11px] font-mono text-gray-300 transition-all duration-300 text-left shrink-0 cursor-pointer flex items-center gap-1.5 active:scale-95 animate-fade-in"
                      >
                        <span className="text-[8px] opacity-75 border border-[#00f3ff]/30 px-1 rounded uppercase tracking-tighter text-[#00f3ff] shrink-0 font-bold">
                          {chip.tag}
                        </span>
                        <span className="truncate">{chip.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages log */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`group relative flex flex-col gap-1 max-w-[85%] ${
                    msg.sender === "bot" ? "self-start" : "self-end animate-slide-in-right"
                  }`}
                >
                  {/* Identity technical tag */}
                  <div
                    className={`flex items-center gap-2 px-1 text-[9px] font-mono select-none ${
                      msg.sender === "bot" 
                        ? "text-[#00f3ff]/60 self-start" 
                        : "text-[#bc13fe]/60 self-end"
                    }`}
                  >
                    <span>{msg.sender === "bot" ? "mibee@portfolio:~$" : "user@operator:~$" }</span>
                    {msg.sender === "bot" && (
                      <button
                        onClick={() => handleCopyMessage(msg.text, index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded text-gray-500 hover:text-[#00f3ff] cursor-pointer"
                        title="Copiar mensagem"
                      >
                        {copiedMessageIndex === index ? (
                          <Check className="w-2.5 h-2.5 text-[#0aff0a]" />
                        ) : (
                          <Copy className="w-2.5 h-2.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Message body container */}
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.sender === "bot"
                        ? "bg-[#13131f]/50 border border-white/10 rounded-tl-none text-slate-200"
                        : "bg-[#bc13fe]/10 border border-[#bc13fe]/30 rounded-tr-none text-slate-100 font-mono text-sm leading-relaxed"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <div className="prose prose-sm max-w-none text-slate-200 prose-p:leading-relaxed prose-pre:p-0 prose-invert font-mono">
                        <ReactMarkdown
                          components={{
                            h1: ({node, ...props}: any) => <h1 className="text-[#00f3ff] font-display font-bold text-base my-2 tracking-wide border-b border-white/10 pb-1" {...props} />,
                            h2: ({node, ...props}: any) => <h2 className="text-[#00f3ff] font-display font-bold text-sm my-2 tracking-wide" {...props} />,
                            p: ({node, ...props}: any) => <p className="mb-3 leading-relaxed text-xs font-mono text-gray-300" {...props} />,
                            ul: ({node, ...props}: any) => <ul className="list-none mb-3 space-y-1.5 font-mono text-xs pl-1" {...props} />,
                            ol: ({node, ...props}: any) => <ol className="list-decimal pl-5 mb-3 space-y-1.5 font-mono text-xs text-gray-300" {...props} />,
                            li: ({node, ...props}: any) => (
                              <li className="flex items-start gap-2 font-mono text-xs text-gray-300">
                                <span className="text-[#00f3ff] shrink-0 mt-1 select-none">➜</span>
                                <span>{props.children}</span>
                              </li>
                            ),
                            code: ({className, children, ...props}: any) => {
                              const match = /language-(\w+)/.exec(className || '');
                              const isInline = !match && !String(children).includes('\n');
                              return isInline ? (
                                <code className="px-1.5 py-0.5 bg-[#0a0a0c]/80 rounded border border-white/15 font-mono text-[10px] text-[#00f3ff] inline-block break-all" {...props}>
                                  {children}
                                </code>
                              ) : (
                                <div className="relative group/code my-3">
                                  <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => navigator.clipboard.writeText(String(children))}
                                      className="p-1 rounded bg-[#13131f] border border-white/10 text-gray-400 hover:text-[#00f3ff] transition-colors cursor-pointer"
                                      title="Copiar código"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <pre className="p-3 bg-[#0a0a0c]/95 rounded-xl border border-white/10 font-mono text-[10px] overflow-x-auto text-[#0aff0a]/90 leading-relaxed shadow-inner">
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  </pre>
                                </div>
                              );
                            },
                            a: ({node, ...props}: any) => <a className="text-[#00f3ff] hover:text-[#00f3ff]/80 underline font-mono text-xs inline-flex items-center gap-1 transition-colors animate-pulse" target="_blank" rel="noopener noreferrer" {...props} />,
                            strong: ({node, ...props}: any) => <strong className="text-[#00f3ff] font-bold tracking-wide" {...props} />,
                            table: ({node, ...props}: any) => <div className="overflow-x-auto my-4 border border-white/10 rounded-xl bg-[#0a0a0c]/30"><table className="w-full text-left font-mono text-[10px] border-collapse" {...props} /></div>,
                            th: ({node, ...props}: any) => <th className="p-2 bg-[#0a0a0c] text-[#00f3ff] font-bold border-b border-white/10 font-display tracking-wider uppercase text-[9px]" {...props} />,
                            td: ({node, ...props}: any) => <td className="p-2 border-b border-white/5 text-gray-300" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {/* Processing loading state */}
              {isLoading && (
                <div className="flex items-center gap-2 rounded-xl bg-[#0a0a0c]/60 border border-white/10 px-3.5 py-2.5 text-[#00f3ff]/80 font-mono text-xs w-fit select-none animate-pulse">
                  <Cpu className="w-3.5 h-3.5 animate-spin text-[#00f3ff]" />
                  <span className="tracking-widest uppercase text-[10px]">MIBEE PROCESSING QUERY</span>
                  <span className="animate-ping text-[#00f3ff] font-bold">_</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll snapping float btn */}
            {showScrollToBottom && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-20 right-6 z-50 p-2.5 rounded-full bg-[#13131f] border border-[#00f3ff] text-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.3)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                title="Rolar para o fim"
              >
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            )}

            {/* Input area */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0c]/40 flex items-center gap-2.5 relative">
              <span className="text-[#00f3ff] font-mono font-bold select-none text-md">&gt;</span>
              <input
                type="text"
                className="flex-1 bg-[#0a0a0c]/60 border border-white/10 rounded-xl p-2.5 px-3.5 text-xs font-mono text-gray-200 outline-none placeholder-gray-600 focus-visible:border-[#00f3ff] focus-visible:ring-1 focus-visible:ring-[#00f3ff]/30 transition-all"
                placeholder="Digitar comando ou consulta..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
              />
              <Button
                size="icon"
                className={`h-10 w-10 shrink-0 rounded-xl transition-all duration-300 flex items-center justify-center border cursor-pointer active:scale-95
                  ${inputValue.trim() === "" || isLoading
                    ? "bg-[#13131f] border-white/5 text-gray-600 shadow-none cursor-not-allowed opacity-45"
                    : "bg-[#00f3ff] border-[#00f3ff] text-[#0a0a0c] shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:bg-[#00f3ff]/90 hover:shadow-[0_0_20px_rgba(0,243,255,0.65)] hover:border-white/30"
                  }
                `}
                onClick={() => handleSendMessage()}
                disabled={isLoading || inputValue.trim() === ""}
                aria-label="Transmitir comando"
              >
                <Send className={`w-4 h-4 transition-colors font-bold ${inputValue.trim() === "" || isLoading ? "text-gray-600" : "text-[#0a0a0c]"}`} />
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chat;
