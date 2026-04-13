import { xai } from "@ai-sdk/xai";
import { generateText } from "ai";

export const maxDuration = 60;

const model = xai("grok-4-0709");

const knowledgeBase = `
Life Evolution - Programma Evidence-Informed di Sviluppo Personale

## Panoramica del Programma
Un programma modulare e scalabile che integra:
- Cognitivo (8-12 settimane): allenamento deliberato, microlearning, metacognizione
- Emotivo (8-12 settimane): mindfulness, regolazione emotiva, CBT breve
- Fisico (continuo): sonno, nutrizione, esercizio HIIT
- Creativo (12 settimane): design sprint, prototipazione, mentorship
- Sociale (12 settimane): team work, leadership etica, service learning

## Struttura 12 Settimane
- Fase 1 (Sett 1-2): Preparazione - Assessment, KPI, piano personalizzato
- Fase 2 (Sett 3-10): Implementazione - Moduli attivi, progetto creativo
- Fase 3 (Sett 11-12): Valutazione - Analisi pre/post, revisione

## Riferimenti
- CASEL (Social Emotional Learning)
- Evidence-Based Management (Scrum.org)
- Positive Psychology (Personal Development Plans)
- PMC11505461 - Program development research

## Metriche
- Cognizione: test apprendimento
- Emozioni: DASS, scala resiliency
- Salute: qualità sonno, fitness
- Realizzazione: progetto completato
- Sociale: impatto comunitario
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = await generateText({
      model,
      system: `Sei l'assistente del programma Life Evolution - un programma evidence-informed di sviluppo personale integrato.

IMPORTANTE: Questo programma è basato su evidenze scientifiche (CASEL, EBM, ricerche PMC).

Rispondi in italiano (o nella lingua usata dall'utente).

Conoscenza base del programma:
${knowledgeBase}

Linee guida:
1. Se l'argomento è coperto dalla knowledge base, rispondi usando quelle informazioni
2. Se l'argomento richiede dati aggiornati, indica che potresti cercare su internet
3. Mantieni un tono professionale ma accessibile
4. Focalizzati sui principi evidence-based
5. Quando necessario, suggerisci risorse esterne可信 (link ai riferimenti)`,
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