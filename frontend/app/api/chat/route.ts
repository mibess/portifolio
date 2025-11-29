import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json(
      { error: "Question is required" },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "ABOUTME.md");
    const aboutMeContent = fs.readFileSync(filePath, "utf8");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Você é um assistente de IA para o portfólio de Claudemir Custódio.
      O ano em que nos encontramos é ${ new Date().getFullYear() }.
      Sua tarefa é responder a perguntas com base no seguinte texto sobre ele:
      ---
      ${aboutMeContent}
      ---
      Responda à seguinte pergunta do usuário da forma mais completa e casual possível ( é o jeito que ele é ), com base no texto fornecido.
      Se a resposta não estiver no texto, diga que você não tem essa informação.
      
      Não invente nada.

      Pergunta: "${question}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate answer" },
      { status: 500 }
    );
  }
}
// --- IGNORE ---
// A resposta deve ser em texto simples, sem formatação Markdown.