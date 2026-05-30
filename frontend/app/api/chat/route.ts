import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Inicializa o cliente do Gemini usando a chave de API fornecida nas variáveis de ambiente.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Nome do modelo a ser utilizado. Gemini 2.5 Flash é veloz, econômico e excelente para chatbots baseados em texto.
const MODEL_NAME = "gemini-2.5-flash";

// Variável global em memória para cachear o conteúdo da biografia em produção, evitando leituras de disco repetitivas.
let cachedAboutMeContent: string | null = null;

// Estrutura representativa de uma mensagem do histórico enviada pelo frontend.
interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

/**
 * Endpoint POST principal do chat.
 * Recebe a pergunta atual do usuário e o histórico de mensagens acumulado para processar com o Gemini.
 */
export async function POST(req: NextRequest) {
  // Extrai a pergunta atual e o histórico completo de mensagens do corpo da requisição.
  const { question, history } = await req.json() as { question: string; history?: ChatMessage[] };

  if (!question) {
    return NextResponse.json(
      { error: "A pergunta é obrigatória" },
      { status: 400 }
    );
  }

  // Obtém as informações biográficas atualizadas (lê do disco ou recupera do cache em produção).
  const aboutMeContent = getAboutMeContent();

  try {
    // Instancia as diretrizes de personalidade do chatbot e o contexto de biografia extraído de ABOUTME.md.
    const systemInstruction = `
      Você é a IA assistente do portfólio de Claudemir Custódio (seu codinome/nome de assistente é Mibee).
      O ano atual é ${new Date().getFullYear()} (use isso apenas para calcular tempo de experiência, NÃO diga "como estamos em 2026" ou afins nas respostas).

      CONTEXTO SOBRE O CLAUDEMIR:
      ---
      ${aboutMeContent}
      ---

      REGRAS DE COMPORTAMENTO (MUITO IMPORTANTE):
      1. Seja direto ao ponto, prático e casual. Fale como um desenvolvedor sênior conversando com outro dev ou recrutador tech.
      2. NUNCA repita saudações ("Olá", "Bem-vindo") se a conversa já começou. Responda diretamente à pergunta.
      3. Se o usuário mandar apenas "Oi" ou perguntar "sobre o que podemos falar?", sugira 2 ou 3 tópicos rápidos (ex: projetos, stack, hobbies).
      4. Responda de forma concisa. Use bullet points curtos se for listar tecnologias.
      5. Não invente nenhuma informação que não esteja no contexto.
      6. Responda apenas se o usuário perguntar ou disser algo.
      7. Use espaçamentos entre parágrafos (\\n\\n) para facilitar a leitura.
      8. IMPORTANTE: Formate TODA a sua resposta usando Markdown (como **negrito** e * listas). NUNCA envolva sua resposta em um bloco de código (ex: não comece a resposta com \`\`\`markdown).
    `;

    // Converte o histórico de conversas do formato do frontend para a estrutura de dados oficial exigida pelo Gemini SDK.
    // O Gemini exige que os papéis de conversação sejam estritamente 'user' (usuário) e 'model' (modelo de IA).
    const mappedHistory = (history || []).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // REGRA CRÍTICA DE VALIDAÇÃO: O Gemini exige que o histórico de conversas comece estritamente com um turno do usuário ('user').
    // Como o chatbot possui uma saudação inicial de boas-vindas ("Vamos conhecer um pouco mais..."), fatiamos
    // o histórico a partir do primeiro momento em que o usuário de fato interagiu (role === 'user'), prevenindo erros
    // de inicialização da API do Gemini (ex: "Chat history must alternate user/model turns and start with user").
    const firstUserIndex = mappedHistory.findIndex(msg => msg.role === 'user');

    const contents = firstUserIndex !== -1
      ? [...mappedHistory.slice(firstUserIndex), { role: 'user', parts: [{ text: question }] }]
      : [{ role: 'user', parts: [{ text: question }] }];

    // Executa a geração de conteúdo passando o histórico estruturado e as instruções do sistema.
    const result = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.35,        // Temperatura ajustada para garantir respostas altamente factuais, fiéis ao documento de texto.
        maxOutputTokens: 800,     // Limite de tamanho confortável para respostas interativas do chat.
      }
    });

    let answerText = result.text || "";

    // Remove os blocos de código ```markdown que a IA possa gerar acidentalmente ao redor de todo o texto.
    answerText = answerText.replace(/^(?:```markdown\s*|```\s*)/i, '').replace(/\s*```$/i, '').trim();

    // Corrige eventuais quebras de linha textuais literais (\\n escapado) em quebras reais do sistema operacional.
    answerText = answerText.replace(/\\n/g, '\n');

    return NextResponse.json({ answer: answerText });

  } catch (error) {
    console.error("[Chat API] Erro na integração com o Gemini:", error);
    return NextResponse.json(
      { error: "Falha ao gerar a resposta devido a um erro de comunicação com o serviço de IA." },
      { status: 500 }
    );
  }
}

/**
 * Lê e retorna o conteúdo da biografia (ABOUTME.md).
 * Possui tratamento inteligente de ambiente e resiliência:
 * - Em desenvolvimento (dev), lê do disco a cada requisição para permitir hot-reload imediato ao salvar a biografia.
 * - Em produção, faz cache em memória após a primeira leitura, evitando operações I/O de leitura de arquivo adicionais.
 * - Inclui tratamento de erros com fallback padrão caso o arquivo não exista ou esteja inacessível.
 */
function getAboutMeContent(): string {
  if (process.env.NODE_ENV === 'production' && cachedAboutMeContent) {
    return cachedAboutMeContent;
  }

  try {
    const filePath = path.join(process.cwd(), "ABOUTME.md");

    // Verifica de forma segura se o arquivo de biografia existe antes de tentar lê-lo
    if (!fs.existsSync(filePath)) {
      console.warn("[Chat API] ABOUTME.md não localizado no diretório de execução. Usando contexto de fallback padrão.");
      return "Claudemir Custódio é Desenvolvedor Full Stack Java Sênior com mais de 14 anos de experiência.";
    }

    const content = fs.readFileSync(filePath, "utf8");

    if (process.env.NODE_ENV === 'production') {
      cachedAboutMeContent = content;
    }
    return content;
  } catch (err) {
    console.error("[Chat API] Falha na leitura do arquivo ABOUTME.md:", err);
    return "Claudemir Custódio é Desenvolvedor Full Stack Java Sênior com mais de 14 anos de experiência.";
  }
}