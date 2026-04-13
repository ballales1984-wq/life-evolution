export const maxDuration = 120;

const knowledgeBase = `
LIFE EVOLUTION - PROGRAMMA EVIDENCE-INFORMED DI SVILUPPO PERSONALE

## I 5 MODULI
1. COGNITIVO: Allenamento deliberato, metacognizione
2. EMOTIVO: Mindfulness, CBT breve
3. FISICO: Sonno, nutrizione, HIIT
4. CREATIVO: Design sprint, prototipazione
5. SOCIALE: Leadership, service learning

## CALENDARIO 12 SETTIMANE
Sett 1-2: Preparazione | Sett 3-10: Implementazione | Sett 11-12: Valutazione

## GIORNO TIPO (45-75 min)
Mattina 20min: Apprendimento, Pausa 5min, Pomeriggio 10min: Mindfulness, Sera 15-30min: Movimento

## CHECKPOINT
Baseline (sett 0), Checkpoint 1 (sett 4), Checkpoint 2 (sett 8), Finale (sett 12)

## METRICHE
Cognizione, Emozioni (stress 0-10), Salute, Realizzazione
`;

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
        system: `Sei assistente Life Evolution - programma sviluppo personale 12 settimane.

CONOSCENZA:
${knowledgeBase}

Rispondi in italiano. Usa knowledge base. Tono professionale.`,
        messages: formattedMessages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();

    return Response.json({
      content: data.response || "Nessuna risposta",
      finishReason: data.done ? "stop" : "unknown",
    });
  } catch (error) {
    console.error("Ollama error:", error);
    return Response.json(
      { error: "Ollama non disponibile. Avvia 'ollama serve' nel terminale." },
      { status: 500 }
    );
  }
}