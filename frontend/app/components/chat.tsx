"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown, { type Components } from "react-markdown";
import { ArrowDown, Check, Copy, Loader2, MessageSquareText, RotateCcw, Send, X } from "lucide-react";
import { useTravaDeRolagem } from "@/lib/scroll-lock";
import { contato } from "@/lib/content";

type Mensagem = { sender: "user" | "bot"; text: string };

const SUGESTOES = [
  { label: "Consultoria", text: "Como funciona uma consultoria com o Claudemir?" },
  { label: "Mentoria", text: "Para quem é a mentoria do Claudemir?" },
  { label: "Experiência", text: "Qual é a experiência profissional do Claudemir?" },
  { label: "Projetos", text: "Quais projetos o Claudemir desenvolveu?" },
  { label: "Tech Stack", text: "Quais são as tecnologias favoritas do Claudemir?" },
  { label: "Planos", text: "Me fale sobre o Agora e o Depois do Claudemir" },
  { label: "Hobbies", text: "Quais são os hobbies e interesses do Claudemir?" },
  { label: "Formação", text: "Qual é a formação profissional do Claudemir?" },
];

const BOAS_VINDAS: Mensagem = {
  sender: "bot",
  text: "Vamos conhecer um pouco mais do Claudemir? Selecione um dos tópicos abaixo ou digite sua pergunta.",
};

/** Remove a prop `node` que o react-markdown repassa, para ela não chegar ao DOM. */
function semNode<T extends { node?: unknown }>({ node, ...resto }: T) {
  void node;
  return resto;
}

const markdown: Components = {
  h1: (props) => <h4 className="mb-2 mt-1 font-semibold" {...semNode(props)} />,
  h2: (props) => <h4 className="mb-2 mt-1 font-semibold" {...semNode(props)} />,
  h3: (props) => <h4 className="mb-2 mt-1 font-semibold" {...semNode(props)} />,
  p: (props) => <p className="mb-3 last:mb-0" {...semNode(props)} />,
  ul: (props) => <ul className="mb-3 space-y-1.5 last:mb-0" {...semNode(props)} />,
  ol: (props) => <ol className="mb-3 list-decimal space-y-1.5 pl-5 last:mb-0" {...semNode(props)} />,
  li: ({ children }) => (
    <li className="relative pl-4">
      <span className="absolute left-0 top-[0.62em] h-1.5 w-1.5 bg-planta-forte" aria-hidden="true" />
      {children}
    </li>
  ),
  a: (props) => (
    <a className="font-medium text-planta-forte underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...semNode(props)} />
  ),
  strong: (props) => <strong className="font-semibold text-tinta" {...semNode(props)} />,
  code: (props) => <code className="rounded bg-nevoa px-1 py-0.5 font-mono text-[12px]" {...semNode(props)} />,
  table: (props) => (
    <div className="my-3 overflow-x-auto rounded border border-linha">
      <table className="w-full text-left text-[13px]" {...semNode(props)} />
    </div>
  ),
  th: (props) => <th className="border-b border-linha bg-nevoa p-2 font-semibold" {...semNode(props)} />,
  td: (props) => <td className="border-b border-linha p-2" {...semNode(props)} />,
};

export default function Chat() {
  const [aberto, setAberto] = useState(false);
  const [movel, setMovel] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [entrada, setEntrada] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [copiada, setCopiada] = useState<number | null>(null);
  const [mostrarFim, setMostrarFim] = useState(false);
  const fimRef = useRef<HTMLDivElement>(null);
  const rolagemRef = useRef<HTMLDivElement>(null);
  const campoRef = useRef<HTMLInputElement>(null);

  useTravaDeRolagem(aberto && movel);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const atualizar = () => setMovel(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 80);
    return () => window.clearTimeout(t);
  }, [mensagens, carregando]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", aoTeclar);
    if (!movel) campoRef.current?.focus({ preventScroll: true });
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto, movel]);

  const alternar = () => {
    setAberto((v) => !v);
    if (mensagens.length === 0) setMensagens([BOAS_VINDAS]);
  };

  const aoRolar = () => {
    const el = rolagemRef.current;
    if (!el) return;
    setMostrarFim(el.scrollHeight - el.scrollTop - el.clientHeight > 150);
  };

  const copiar = async (texto: string, i: number) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiada(i);
      window.setTimeout(() => setCopiada(null), 2000);
    } catch {
      setCopiada(null);
    }
  };

  const enviar = async (textoSugerido?: string) => {
    const pergunta = (textoSugerido ?? entrada).trim();
    if (!pergunta || carregando) return;
    const historico = mensagens;
    setMensagens((m) => [...m, { sender: "user", text: pergunta }]);
    if (textoSugerido === undefined) setEntrada("");
    setCarregando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: pergunta, history: historico }),
      });
      if (!res.ok) throw new Error(`Falha na resposta do assistente (${res.status})`);
      const { answer } = (await res.json()) as { answer: string };
      setMensagens((m) => [...m, { sender: "bot", text: answer }]);
    } catch (erro) {
      console.error(erro);
      setMensagens((m) => [
        ...m,
        { sender: "bot", text: `Não consegui responder agora. Tente de novo em instantes ou fale direto pelo e-mail ${contato.email}.` },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  const reiniciar = () => {
    setMensagens([{ sender: "bot", text: "Conversa reiniciada. Selecione um dos tópicos abaixo ou digite sua pergunta." }]);
    setEntrada("");
    setCarregando(false);
  };

  const semPerguntas = !mensagens.some((m) => m.sender === "user");

  return (
    <>
      <button
        type="button"
        onClick={alternar}
        aria-expanded={aberto}
        aria-controls="mibee-chat"
        aria-label={aberto ? "Fechar o assistente Mibee" : "Abrir o assistente Mibee"}
        className="chat-gatilho fixed bottom-5 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center gap-2.5 rounded-full border border-traco bg-tinta text-[15px] sm:w-auto sm:pl-4 sm:pr-5 font-semibold text-claro shadow-[0_12px_32px_rgb(7_17_28/0.35)] transition-transform duration-300 ease-saida hover:-translate-y-0.5"
        style={{ marginBottom: "env(safe-area-inset-bottom)", marginRight: "env(safe-area-inset-right)" }}
      >
        {aberto ? <X className="h-5 w-5" aria-hidden="true" /> : <MessageSquareText className="h-5 w-5 text-mel" aria-hidden="true" />}
        <span className="sr-only sm:not-sr-only">{aberto ? "Fechar" : "Pergunte ao Mibee"}</span>
      </button>

      <AnimatePresence>
        {aberto ? (
          <>
            {movel ? (
              <motion.div
                key="fundo"
                className="fixed inset-0 z-[61] bg-noite/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setAberto(false)}
                aria-hidden="true"
              />
            ) : null}
            <motion.section
              key="painel"
              id="mibee-chat"
              role="dialog"
              aria-modal={movel ? "true" : "false"}
              aria-label="Assistente Mibee"
              className="fixed inset-x-0 bottom-0 z-[62] flex h-[88dvh] flex-col overflow-hidden rounded-t-xl border border-linha bg-branco text-tinta shadow-2xl md:inset-x-auto md:bottom-24 md:right-5 md:h-[min(620px,calc(100dvh-8rem))] md:w-[420px] md:rounded-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              <header className="flex items-center justify-between gap-3 bg-tinta px-4 py-3 text-claro">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-9 w-9 place-items-center rounded border border-traco font-mono text-sm">
                    M<span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-mel" aria-hidden="true" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-semibold">Mibee</p>
                    <p className="font-mono text-[12px] text-claro-suave">Assistente do Claudemir</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={reiniciar} className="grid h-10 w-10 place-items-center rounded text-claro-suave hover:bg-grafite hover:text-claro" aria-label="Reiniciar conversa" title="Reiniciar conversa">
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => setAberto(false)} className="grid h-10 w-10 place-items-center rounded text-claro-suave hover:bg-grafite hover:text-claro" aria-label="Fechar assistente" title="Fechar">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </header>

              <div ref={rolagemRef} onScroll={aoRolar} data-lenis-prevent="" className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4" aria-live="polite">
                <div className="rounded border border-linha bg-papel p-4 text-[15px] leading-relaxed">
                  Olá! Eu sou o <strong>Mibee</strong>, o assistente do Claudemir. Conheço a biografia, os projetos e as competências técnicas dele. Como posso ajudar?
                </div>

                {semPerguntas ? (
                  <div>
                    <p className="t-eyebrow mb-2 text-ardosia">Tópicos sugeridos</p>
                    <div className="grid grid-cols-2 gap-2">
                      {SUGESTOES.map((s) => (
                        <button
                          key={s.label}
                          type="button"
                          onClick={() => enviar(s.text)}
                          className="min-h-11 rounded border border-linha bg-branco px-3 py-2 text-left text-[14px] transition-colors duration-200 hover:border-tinta"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {mensagens.map((m, i) =>
                  m.sender === "bot" ? (
                    <div key={i} className="group max-w-[90%] self-start">
                      <div className="rounded rounded-tl-none border border-linha bg-papel p-3 text-[14px] leading-relaxed">
                        <ReactMarkdown components={markdown}>{m.text}</ReactMarkdown>
                      </div>
                      <button
                        type="button"
                        onClick={() => copiar(m.text, i)}
                        className="mt-1 inline-flex min-h-8 items-center gap-1 font-mono text-[12px] text-ardosia opacity-70 hover:opacity-100"
                        aria-label="Copiar resposta"
                      >
                        {copiada === i ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                        {copiada === i ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                  ) : (
                    <div key={i} className="max-w-[85%] self-end rounded rounded-tr-none bg-tinta p-3 text-[14px] leading-relaxed text-claro">
                      {m.text}
                    </div>
                  ),
                )}

                {carregando ? (
                  <div className="flex w-fit items-center gap-2 rounded border border-linha bg-papel px-3 py-2 font-mono text-[12px] text-ardosia">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Mibee está escrevendo
                  </div>
                ) : null}
                <div ref={fimRef} />
              </div>

              {mostrarFim ? (
                <button
                  type="button"
                  onClick={() => fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })}
                  className="absolute bottom-24 right-5 grid h-10 w-10 place-items-center rounded-full border border-linha bg-branco shadow-md"
                  aria-label="Ir para a última mensagem"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}

              <form
                className="flex items-center gap-2 border-t border-linha bg-branco p-3"
                style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  enviar();
                }}
              >
                <label htmlFor="mibee-pergunta" className="sr-only">
                  Sua pergunta
                </label>
                <input
                  ref={campoRef}
                  id="mibee-pergunta"
                  type="text"
                  value={entrada}
                  onChange={(e) => setEntrada(e.target.value)}
                  placeholder="Pergunte sobre consultoria, projetos ou experiência"
                  disabled={carregando}
                  autoComplete="off"
                  className="min-h-11 flex-1 rounded border border-linha bg-papel px-3 text-[15px] outline-none placeholder:text-ardosia/80 focus-visible:border-tinta"
                />
                <button
                  type="submit"
                  disabled={carregando || entrada.trim() === ""}
                  className="grid h-11 w-11 flex-none place-items-center rounded bg-mel text-tinta transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Enviar pergunta"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
