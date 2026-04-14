import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export const maxDuration = 120;

const model = groq("llama-3.3-70b-versatile");

const knowledgeBase = `
LIFE EVOLUTION - PROGRAMMA 12 SETTIMANE

## 5 MODULI
1. COGNITIVO: Apprendimento, metacognizione
2. EMOTIVO: Mindfulness, regolazione emotiva
3. FISICO: Sonno, nutrizione, HIIT
4. CREATIVO: Design sprint, prototipazione
5. SOCIALE: Leadership, service learning

## CALENDARIO
Sett 1-2: Preparazione | Sett 3-10: Implementazione | Sett 11-12: Valutazione

## GIORNO TIPO (45-75 min)
Mattina: Apprendimento
Pausa: Respirazione
Pomeriggio: Mindfulness
Sera: Movimento + diario
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = await generateText({
      model,
      system: `Sei assistente Life Evolution - programma sviluppo personale 12 settimane.

${knowledgeBase}

Rispondi in italiano.`,
      messages,
    });

    return Response.json({
      content: result.text,
      finishReason: result.finishReason,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return Response.json(
      { error: "Errore. Aggiungi GROQ_API_KEY nelle variabili ambiente su Kilo." },
      { status: 500 }
    );
  }
}