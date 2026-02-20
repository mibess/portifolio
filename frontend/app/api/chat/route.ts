import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const aboutMeContent = getAboutMeContent();
const MODEL_NAME = "gemini-3-flash-preview";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json(
      { error: "A pergunta é obrigatória" },
      { status: 400 }
    );
  }

  try {
    const systemInstruction = `
      Você é a IA assistente do portfólio de Claudemir Custódio.
      O ano atual é ${new Date().getFullYear()} (use isso apenas para calcular tempo de experiência, NÃO diga "como estamos em 2026" nas respostas).

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
    `;

    const result = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return NextResponse.json({ answer: result.text });
  } catch (error) {
    console.error("Erro na integração com o Gemini:", error);
    return NextResponse.json(
      { error: "Falha ao gerar a resposta" },
      { status: 500 }
    );
  }
}

function getAboutMeContent() {
  const filePath = path.join(process.cwd(), "ABOUTME.md");
  return fs.readFileSync(filePath, "utf8");
}