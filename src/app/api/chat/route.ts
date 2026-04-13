import { readFileSync } from "fs";
import { join } from "path";

export const maxDuration = 120;

const knowledgeBase = readFileSync(
  join(process.cwd(), "knowledge.md"),
  "utf-8"
);

const systemPrompt = `Sei l'assistente del programma Life Evolution - un programma evidence-informed di sviluppo personale integrato della durata di 12 settimane.

Rispondi in italiano (o nella lingua usata dall'utente).

Conoscenza completa del programma:
${knowledgeBase}

Linee guida per le risposte:
1. Usa le informazioni dalla knowledge base per rispondere accuratamente
2. Mantieni un tono professionale ma accessibile
3. Focalizzati sui principi evidence-based
4. Quando appropriato, suggerisci le risorse o riferimenti
5. Incoraggia la costruzione di abitudini quotidiane
6. Ricorda le metriche e i checkpoint del programma`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3:mini",
        stream: false,
        system: systemPrompt,
        messages: formattedMessages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();

    return Response.json({
      content: data.response || data.message?.content || "Nessuna risposta generata",
      finishReason: data.done ? "stop" : "unknown",
    });
  } catch (error) {
    console.error("Chat error:", error);
    return Response.json(
      { error: "Errore nella generazione. Verifica che Ollama sia avviato con 'ollama serve'." },
      { status: 500 }
    );
  }
}