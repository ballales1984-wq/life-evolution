export const maxDuration = 120;

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
- Emozioni: DASS, scala resilienza
- Salute: qualità sonno, fitness
- Realizzazione: progetto completato
- Sociale: impatto comunitario
`;

const systemPrompt = `Sei l'assistente del programma Life Evolution - un programma evidence-informed di sviluppo personale integrato.

Rispondi in italiano (o nella lingua usata dall'utente).

Conoscenza base del programma:
${knowledgeBase}

Linee guida:
1. Se l'argomento è coperto dalla knowledge base, rispondi usando quelle informazioni
2. Mantieni un tono professionale ma accessibile
3. Focalizzati sui principi evidence-based
4. Suggerisci risorse esterne quando utile`;

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
      { error: "Errore nella generazione della risposta. Verifica che Ollama sia avviato." },
      { status: 500 }
    );
  }
}