import { xai } from "@ai-sdk/xai";
import { generateText } from "ai";

export const maxDuration = 120;

const model = xai("grok-4-0709");

const knowledgeBase = `
LIFE EVOLUTION - PROGRAMMA EVIDENCE-INFORMED DI SVILUPPO PERSONALE

## I 5 MODULI

1. COGNITIVO (8-12 settimane): Allenamento deliberato, microlearning, metacognizione
2. EMOTIVO (8-12 settimane): Mindfulness, regolazione emotiva, CBT breve
3. FISICO E BIOLOGICO (continuo): Sonno, nutrizione, esercizio HIIT
4. CREATIVO E REALIZZATIVO (12 settimane): Design sprint, prototipazione
5. SOCIALE E CIVICO (12 settimane): Team work, leadership etica

## CALENDARIO 12 SETTIMANE
Sett 1-2: Preparazione, Sett 3-10: Implementazione, Sett 11-12: Valutazione

## GIORNO TIPO (45-75 min)
Mattina 20min: Apprendimento, Pausa 5min: Respirazione, Pomeriggio 10min: Mindfulness, Sera 15-30min: HIIT + diario

## CHECKPOINT
Baseline (sett 0), Checkpoint 1 (sett 4), Checkpoint 2 (sett 8), Finale (sett 12)

## METRICHE
Cognizione (test apprendimento), Emozioni (scala stress 0-10), Salute (sonno), Realizzazione (progetto)
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = await generateText({
      model,
      system: `Sei l'assistente del programma Life Evolution - programma evidence-informed di sviluppo personale.

CONOSCENZA:
${knowledgeBase}

Rispondi in italiano. Usa la knowledge base. Tono professionale ma accessibile.`,
      messages,
    });

    return Response.json({
      content: result.text,
      finishReason: result.finishReason,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return Response.json(
      { error: "Errore nella generazione della risposta" },
      { status: 500 }
    );
  }
}