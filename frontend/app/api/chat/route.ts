import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { atuacao, contato, metodo } from "@/lib/content";

// Gemini 2.5 Flash: rápido, econômico e bom para respostas de chat baseadas em texto.
const MODEL_NAME = "gemini-2.5-flash";

// Cliente criado sob demanda: o build não depende de GEMINI_API_KEY e a rota responde 503 se a chave faltar.
let client: GoogleGenAI | null = null;
function getClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  client ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
}

// Cache em memória da biografia em produção, evitando leituras repetidas do disco.
let cachedAboutMeContent: string | null = null;

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

// Oferta de consultoria e mentoria, com os mesmos textos exibidos no site.
const servicosContexto = [
  `${atuacao.titulo}:`,
  ...atuacao.frentes.map((f) => `- ${f.titulo}: ${f.texto} (${f.itens.join(", ")})`),
  `${atuacao.agora.rotulo}: ${atuacao.agora.texto}`,
  `${atuacao.foco.rotulo}: ${atuacao.foco.texto}`,
  `${metodo.titulo}: ${metodo.intro}`,
  ...metodo.etapas.map((e, i) => `${i + 1}. ${e.titulo}: ${e.texto}`),
  `Contato: e-mail ${contato.email}, WhatsApp ${contato.whatsappNumero}, LinkedIn ${contato.linkedin}.`,
].join("\n");

/**
 * Endpoint POST principal do chat.
 * Recebe a pergunta atual e o histórico de mensagens para processar com o Gemini.
 */
export async function POST(req: NextRequest) {
  const { question, history } = (await req.json()) as { question: string; history?: ChatMessage[] };

  if (!question) {
    return NextResponse.json({ error: "A pergunta é obrigatória" }, { status: 400 });
  }

  const ai = getClient();
  if (!ai) {
    console.error("[Chat API] GEMINI_API_KEY não configurada.");
    return NextResponse.json({ error: "Assistente indisponível no momento." }, { status: 503 });
  }

  const aboutMeContent = getAboutMeContent();

  try {
    const systemInstruction = `
      Você é a IA assistente do site de Claudemir Custódio (seu nome de assistente é Mibee).
      O ano atual é ${new Date().getFullYear()} (use isso apenas para calcular tempo de experiência, NÃO diga "como estamos em ${new Date().getFullYear()}" ou afins nas respostas).

      CONTEXTO SOBRE O CLAUDEMIR:
      ---
      ${aboutMeContent}
      ---

      CONSULTORIA, MENTORIA E CONTATO (mesmos textos do site):
      ---
      ${servicosContexto}
      ---

      REGRAS DE COMPORTAMENTO (MUITO IMPORTANTE):
      1. Seja direto, prático e cordial. Fale como um consultor sênior conversando com líderes de tecnologia, empresas e profissionais que buscam mentoria.
      2. NUNCA repita saudações ("Olá", "Bem-vindo") se a conversa já começou. Responda diretamente à pergunta.
      3. Se o usuário mandar apenas "Oi" ou perguntar "sobre o que podemos falar?", sugira 2 ou 3 tópicos rápidos (ex.: consultoria, projetos, stack).
      4. Responda de forma concisa. Use bullet points curtos se for listar tecnologias.
      5. Não invente nenhuma informação que não esteja no contexto. Não informe preços nem prazos; para isso, indique o contato.
      6. Agendamentos de conversa são feitos pelo WhatsApp ${contato.whatsappNumero} (${contato.whatsappUrl}). Para outros contatos, indique o e-mail ${contato.email} ou o LinkedIn.
      7. Use espaçamentos entre parágrafos (\\n\\n) para facilitar a leitura.
      8. IMPORTANTE: Formate TODA a sua resposta usando Markdown (como **negrito** e * listas). NUNCA envolva sua resposta em um bloco de código (ex: não comece a resposta com \`\`\`markdown).
    `;

    // O Gemini usa os papéis 'user' e 'model'.
    const mappedHistory = (history || []).map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // O histórico precisa começar com um turno do usuário; descartamos a saudação inicial do bot.
    const firstUserIndex = mappedHistory.findIndex((msg) => msg.role === "user");

    const contents =
      firstUserIndex !== -1
        ? [...mappedHistory.slice(firstUserIndex), { role: "user", parts: [{ text: question }] }]
        : [{ role: "user", parts: [{ text: question }] }];

    const result = await ai.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction,
        temperature: 0.35,
        maxOutputTokens: 800,
      },
    });

    let answerText = result.text || "";

    // Remove blocos ```markdown que a IA possa gerar ao redor de todo o texto.
    answerText = answerText.replace(/^(?:```markdown\s*|```\s*)/i, "").replace(/\s*```$/i, "").trim();

    // Corrige quebras de linha literais (\\n escapado).
    answerText = answerText.replace(/\\n/g, "\n");

    return NextResponse.json({ answer: answerText });
  } catch (error) {
    console.error("[Chat API] Erro na integração com o Gemini:", error);
    return NextResponse.json(
      { error: "Falha ao gerar a resposta devido a um erro de comunicação com o serviço de IA." },
      { status: 500 },
    );
  }
}

/**
 * Lê a biografia (ABOUTME.md).
 * Em desenvolvimento lê a cada requisição (hot-reload); em produção guarda em cache após a primeira leitura.
 */
function getAboutMeContent(): string {
  if (process.env.NODE_ENV === "production" && cachedAboutMeContent) {
    return cachedAboutMeContent;
  }

  try {
    const filePath = path.join(process.cwd(), "ABOUTME.md");

    if (!fs.existsSync(filePath)) {
      console.warn("[Chat API] ABOUTME.md não localizado. Usando contexto de fallback padrão.");
      return "Claudemir Custódio é engenheiro de software e consultor em arquitetura Java, com experiência desde 2010.";
    }

    const content = fs.readFileSync(filePath, "utf8");

    if (process.env.NODE_ENV === "production") {
      cachedAboutMeContent = content;
    }
    return content;
  } catch (err) {
    console.error("[Chat API] Falha na leitura do arquivo ABOUTME.md:", err);
    return "Claudemir Custódio é engenheiro de software e consultor em arquitetura Java, com experiência desde 2010.";
  }
}
