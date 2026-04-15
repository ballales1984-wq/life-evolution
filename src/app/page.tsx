"use client";

import { useState, useEffect, useRef } from "react";

const modules = [
  { id: "cognitivo", icon: "🧠", title: "Cognitivo", duration: "8-12 settimane", description: "Allenamento deliberato, microlearning, metacognizione", objective: "Aumento performance su test di apprendimento", status: "attivo" },
  { id: "emotivo", icon: "💚", title: "Emotivo", duration: "8-12 settimane", description: "Mindfulness, regolazione emotiva, CBT breve", objective: "Miglioramento punteggio resilienza/benessere", status: "attivo" },
  { id: "fisico", icon: "⚡", title: "Fisico e Biologico", duration: "Continuo", description: "Ottimizzazione del sonno, nutrizione e esercizio HIIT", objective: "Miglioramento qualità sonno e fitness", status: "attivo" },
  { id: "creativo", icon: "🎨", title: "Creativo e Realizzativo", duration: "12 settimane", description: "Design sprint, prototipazione e mentorship", objective: "Progetto concreto completato", status: "pianificato" },
  { id: "sociale", icon: "🤝", title: "Sociale e Civico", duration: "12 settimane", description: "Team work, leadership etica e service learning", objective: "Impatto misurabile su comunità locale", status: "pianificato" },
];

const timeline = [
  { week: 1, phase: "preparazione", title: "Assessment iniziale" },
  { week: 2, phase: "preparazione", title: "Piano personalizzato" },
  { week: 3, phase: "implementazione", title: "Fondamenti cognitivi" },
  { week: 4, phase: "implementazione", title: "Fondamenti emotivi" },
  { week: 5, phase: "implementazione", title: "Intensificazione pratica" },
  { week: 6, phase: "implementazione", title: "Progetto creativo" },
  { week: 7, phase: "implementazione", title: "Monitoraggio biologico" },
  { week: 8, phase: "implementazione", title: "Iterazione progetto" },
  { week: 9, phase: "implementazione", title: "Integrazione" },
  { week: 10, phase: "implementazione", title: "Trasferimento reale" },
  { week: 11, phase: "valutazione", title: "Valutazione intermedia" },
  { week: 12, phase: "valutazione", title: "Chiusura pilota" },
];

const kpiMetrics = [
  { label: "Apprendimento", value: 0, target: 85, icon: "📚" },
  { label: "Resilienza", value: 0, target: 78, icon: "🛡️" },
  { label: "Qualità Sonno", value: 0, target: 82, icon: "😴" },
  { label: "Fitness", value: 0, target: 75, icon: "💪" },
  { label: "Creatività", value: 0, target: 90, icon: "💡" },
  { label: "Impatto Sociale", value: 0, target: 70, icon: "🌍" },
];

const resources = [
  { title: "Template Assessment Iniziale", type: "PDF", size: "245 KB" },
  { title: "Diario Settimanale", type: "PDF", size: "180 KB" },
  { title: "Guida Mindfulness", type: "PDF", size: "320 KB" },
  { title: "Protocollo Esercizio HIIT", type: "PDF", size: "156 KB" },
];

function TabContent({ activeTab }: { activeTab: string }) {
  const [scores, setScores] = useState({ cognizione: 5, emotivo: 5, fisico: 5, motivazione: 5, sociale: 5 });
  const [totalScore, setTotalScore] = useState(0);
  const [animatedValues, setAnimatedValues] = useState(kpiMetrics.map(() => 0));
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{role: "user"|"assistant", content: string}>>([
    { role: "assistant" as const, content: "Ciao! 👋\n\nSono l'assistente AI di Life Evolution.\n\n📚 Posso aiutarti con:\n- Spiegazioni sui 5 moduli\n- Creare i tuoi KPI SMART\n- Consigli su abitudini e mindfulness\n\n💬 Clicca 'Grok' per iniziare!" }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatModel, setChatModel] = useState<"grok" | "ollama">("grok");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = Object.values(scores).reduce((a: number, b: number) => a + b, 0);
    setTotalScore(Math.round((total / 25) * 100));
  }, [scores]);

  useEffect(() => {
    const targets = kpiMetrics.map((k) => k.target);
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAnimatedValues(targets.map((t: number) => Math.round((t * step) / steps)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleScoreChange = (dimension: string, value: number) => {
    setScores((prev) => ({ ...prev, [dimension]: value }));
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setChatLoading(true);
    try {
      const endpoint = chatModel === "grok" ? "/api/chat" : "/api/ollama";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, { role: "user", content: userMessage }] }),
      });
      const data = await response.json();
      if (data.content) {
        setChatMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        setChatMessages((prev) => [...prev, { role: "assistant", content: "Scusa, errore. Riprova." }]);
      }
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Scusa, non connesso. Riprova." }]);
    } finally {
      setChatLoading(false);
    }
  };

  if (activeTab === "panoramica" || !activeTab) {
    return (
      <section className="space-y-12">
        <div><h2 className="text-3xl font-semibold mb-6">Il Programma</h2><p className="text-[#a3a3a3] leading-relaxed mb-8">Life Evolution è un programma evidence-informed, modulare e scalabile.</p></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#171717] border border-[#404040] rounded-xl p-6"><div className="text-4xl mb-4">🎯</div><h3 className="text-xl font-semibold mb-2">Obiettivi SMART</h3><p className="text-[#a3a3a3] text-sm">Ogni partecipante definisce obiettivi Specifici, Misurabili, Achievable, Realistici e Temporalmente definiti.</p></div>
          <div className="bg-[#171717] border border-[#404040] rounded-xl p-6"><div className="text-4xl mb-4">🔄</div><h3 className="text-xl font-semibold mb-2">Cicli di Sperimentazione</h3><p className="text-[#a3a3a3] text-sm">Prototipare, misurare, adattare: iterazioni rapide basate su dati reali.</p></div>
          <div className="bg-[#171717] border border-[#404040] rounded-xl p-6"><div className="text-4xl mb-4">👥</div><h3 className="text-xl font-semibold mb-2">Supporto Sociale</h3><p className="text-[#a3a3a3] text-sm">Gruppi di apprendimento, accountability partner e coaching individuale.</p></div>
        </div>
      </section>
    );
  }

  if (activeTab === "moduli") {
    return (
      <section className="space-y-8">
        <div><h2 className="text-3xl font-semibold mb-2">Moduli del Programma</h2><p className="text-[#a3a3a3]">Cinque aree di sviluppo integrate.</p></div>
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((m) => (
            <div key={m.id} className="bg-[#171717] border border-[#404040] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2"><span className="text-3xl">{m.icon}</span><h3 className="text-xl font-semibold">{m.title}</h3></div>
              <p className="text-[#a3a3a3] text-sm">{m.description}</p>
              <div className="mt-4 pt-4 border-t border-[#404040] flex justify-between text-sm"><span className="text-[#6366f1]">{m.duration}</span><span className="text-[#10b981]">{m.objective}</span></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === "roadmap") {
    return (
      <section className="space-y-8">
        <div><h2 className="text-3xl font-semibold mb-2">Roadmap 12 Settimane</h2><p className="text-[#a3a3a3]">Il percorso pilota.</p></div>
        <div className="grid gap-4">
          {timeline.map((t) => (
            <div key={t.week} className={`flex items-center gap-4 p-4 rounded-xl border ${t.phase === "preparazione" ? "bg-[#6366f1]/10 border-[#6366f1]/30" : t.phase === "implementazione" ? "bg-[#10b981]/10 border-[#10b981]/30" : "bg-[#f59e0b]/10 border-[#f59e0b]/30"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.phase === "preparazione" ? "bg-[#6366f1] text-white" : t.phase === "implementazione" ? "bg-[#10b981] text-[#0a0a0a]" : "bg-[#f59e0b] text-[#0a0a0a]"}`}>{t.week}</div>
              <div className="flex-1 font-medium">{t.title}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === "chat") {
    return (
      <section className="space-y-4">
        <div><h2 className="text-3xl font-semibold mb-2">Assistente AI</h2><p className="text-[#a3a3a3] mb-4">Scegli il modello:</p><div className="flex gap-2 mb-4"><button onClick={() => setChatModel("grok")} className={`px-4 py-2 rounded-lg ${chatModel === "grok" ? "bg-[#10b981] text-[#0a0a0a]" : "bg-[#262626] text-[#a3a3a3]"}`}>🤖 Groq</button><button onClick={() => setChatModel("ollama")} className={`px-4 py-2 rounded-lg ${chatModel === "ollama" ? "bg-[#10b981] text-[#0a0a0a]" : "bg-[#262626] text-[#a3a3a3]"}`}>🖥️ Ollama</button></div></div>
        <div className="bg-[#171717] border border-[#404040] rounded-xl overflow-hidden flex flex-col" style={{ height: "450px" }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (<div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === "user" ? "bg-[#10b981] text-[#0a0a0a]" : "bg-[#262626]"}`}>{msg.content}</div></div>))}
            {chatLoading && <div className="flex justify-start"><div className="bg-[#262626] p-3 rounded-lg"><span className="text-[#10b981]">...</span></div></div>}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleChatSubmit} className="p-3 border-t border-[#404040]"><div className="flex gap-2"><input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Scrivi..." className="flex-1 bg-[#262626] border border-[#404040] rounded-lg px-3 py-2" /><button type="submit" disabled={chatLoading} className="px-4 py-2 bg-[#10b981] text-[#0a0a0a] rounded-lg font-medium disabled:opacity-50">→</button></div></form>
        </div>
      </section>
    );
  }

  if (activeTab === "valutazione") {
    return (
      <section className="space-y-8">
        <div><h2 className="text-3xl font-semibold mb-2">Strumenti di Valutazione</h2><p className="text-[#a3a3a3]">Metriche.</p></div>
        <div className="grid md:grid-cols-3 gap-4">
          {kpiMetrics.map((k, i) => (<div key={i} className="bg-[#171717] border border-[#404040] rounded-xl p-5"><div className="flex items-center gap-2 mb-2"><span className="text-xl">{k.icon}</span><span>{k.label}</span></div><div className="text-3xl font-bold text-[#10b981]">{animatedValues[i]}<span className="text-sm text-[#a3a3a3]">/100</span></div></div>))}
        </div>
        <div className="bg-[#171717] border border-[#404040] rounded-xl p-6"><h3 className="text-xl font-semibold mb-4">Auto-Valutazione</h3><div className="space-y-4">{Object.entries(scores).map(([k, v]) => (<div key={k} className="flex items-center gap-4"><span className="capitalize w-24">{k}</span><input type="range" min="1" max="5" value={v} onChange={(e) => handleScoreChange(k, parseInt(e.target.value))} className="flex-1 accent-[#10b981]" /><span className="text-[#10b981] w-8">{v}</span></div>))}</div><div className="mt-6 text-center"><span className="text-4xl font-bold text-[#10b981]">{totalScore}</span><span className="text-[#a3a3a3]">/100</span></div></div>
      </section>
    );
  }

  if (activeTab === "risorse") {
    return (
      <section className="space-y-8">
        <div><h2 className="text-3xl font-semibold mb-2">Risorse e Download</h2><p className="text-[#a3a3a3]">Materiali.</p></div>
        <div className="grid md:grid-cols-2 gap-4">
          {resources.map((r, i) => (<div key={i} className="bg-[#171717] border border-[#404040] rounded-xl p-4 flex justify-between"><div className="flex items-center gap-3"><span className="text-2xl">📄</span><div><h4 className="font-medium">{r.title}</h4><span className="text-sm text-[#a3a3a3]">{r.type} • {r.size}</span></div></div><span className="text-[#10b981]">↓</span></div>))}
        </div>
      </section>
    );
  }

  if (activeTab === "recinto") {
    const [expandedArt, setExpandedArt] = useState<number | null>(null);
    const [filter, setFilter] = useState<string | null>(null);
    const articles = [
      {
        title: "Il Calcolo del Nulla: quanto costa davvero la tua libertà?",
        icon: "🧮",
        category: "fisica",
        task: "Oggi, dopo aver letto questo pezzo, lascia il telefono a casa e cammina per 20 minuti. Guarda il cielo, non lo schermo.",
        content: `C'è un errore di calcolo alla base della nostra vita moderna, un errore che la "macchina" ci nasconde con cura dietro luci colorate e promesse di performance. Ci hanno convinto che per essere liberi, per muoverci, per fare sport, dobbiamo prima passare alla cassa.
Facciamo i conti, quelli veri.
Oggi, se vuoi andare a correre "come si deve", il sistema ti suggerisce un kit: scarpe in carbonio da 300 euro, abbigliamento tecnico da 100, uno smartphone o un orologio GPS da 1000 per tracciare ogni battito, e magari un abbonamento mensile per la musica. Totale? Circa 1500 euro.
Se calcoli la paga media di un lavoratore, scopri che stai scambiando due mesi della tua vita solo per avere il permesso di mettere un piede davanti all'altro. Stai regalando 300 ore di tempo reale in cambio di un'attrezzatura che ha già una data di scadenza.

Il recinto dei "numeri finiti"
In tre secoli di dati, la macchina ha imparato a recintarci perfettamente. Non servono più muri di pietra: bastano i debiti e i bisogni indotti. Quando accetti questo scambio, diventi quello che io chiamo un "numero finito". Sei prevedibile, tracciabile, incasellato in un foglio di calcolo. Il pastore sa esattamente dove sei e quanto ti resta da pagare.
Ma l'essere umano ha una natura diversa. Noi siamo come il Pi greco (π): un numero infinito, che non si ripete mai, che sfugge a ogni definizione chiusa. La nostra forza è l'imprevedibilità, quella capacità di andare controcorrente che manda in tilt l'algoritmo.

La strategia della sottrazione
Come si esce dal recinto senza abbatterlo fisicamente? Con la sottrazione.
La macchina ha bisogno che tu consumi materie prime, che compri oggetti, che alimenti il mercato. Se tu sottrai la materia e aggiungi l'intangibile, diventi invisibile al sistema.

• Scegli il mare: Il mare è l'ultimo spazio libero. Non ha abbonamenti, non ha sensori. Nuotare è un atto di ribellione gratuita.
• Scegli l'arte e lo studio: Invece di sei birre al bar, compra un libro o vai a un concerto. L'arte non consuma le materie prime per cui le macro-aree si fanno la guerra, ma produce consapevolezza.
• Scegli il silenzio: Se smetti di alimentare la macchina con i tuoi dati e i tuoi acquisti inutili, la macchina smette di conoscerti.

La vera resistenza oggi non è urlare, ma smettere di fare cose che portano a nulla. Quando smetti di scambiare il tuo tempo per il superfluo, quel tempo torna a essere tuo. E in quel tempo ritrovato, puoi finalmente ricominciare a pensare.
Il tuo tempo è l'unica vera materia prima che possiedi. Non svenderla per un recinto di plastica.`
      },
      {
        title: "Geopolitica dei Recinti: perché il mondo si sta chiudendo?",
        icon: "🌍",
        category: "geopolitica",
        task: "Riduci del 50% i prodotti che acquisti questa settimana. Compra solo il necessario.",
        content: `Per trent'anni ci hanno raccontato la favola della globalizzazione: un mondo senza confini, dove le merci viaggiavano libere e noi con loro. Era un'illusione. Oggi quella maschera è caduta e la realtà è sotto gli occhi di tutti: stiamo tornando a dividerci in macro-aree.
Ma non è un caso e non è un fallimento improvviso. È una strategia. Prima di gestire le pecore, devi costruire il recinto.

La fine della "libertà" a basso costo
La globalizzazione è fallita perché la promessa era falsa. Non serviva a renderci tutti "amici", ma a trovare il prezzo più basso sfruttando materie prime e schiavitù altrove. Ora che le risorse scarseggiano e i prezzi esplodono, il sistema ha cambiato marcia.
Siamo passati dall'efficienza alla sicurezza. Ma sicurezza, per chi comanda, significa controllo.

Macro-aree: dividere per governare
Il mondo si sta spaccando in blocchi: l'Occidente, il blocco Cina-Russia, il Sud globale. Sono recinti costruiti su basi precise:

• Lingua e cultura: Barriere naturali che impediscono la comunicazione tra i "controllati".
• Tecnologia: Ogni macro-area vuole il suo sistema GPS, i suoi microchip, la sua IA.
• Materie prime: La lotta per il litio, il cobalto e l'energia serve a decidere chi ha il permesso di muoversi e chi deve restare fermo.

Se controlli l'energia e i metalli, controlli il recinto. Se alzi il prezzo delle materie prime, crei povertà. E la povertà è il recinto più invisibile e feroce che esista: non ti serve una guardia alla porta se non hai i soldi per il biglietto.

La sorveglianza di massa: due facce, stessa medaglia
In Cina la sorveglianza è esplicita, con il credito sociale e le telecamere. In Occidente "non si dice", ma c'è. È mascherata da comodità, da app, da passaporti biometrici e identità digitali.
Due facce della stessa medaglia:
1. Da una parte, l'ordine imposto con la forza.
2. Dall'altra, l'ordine imposto con la burocrazia e il consumo.

Il risultato è lo stesso: il 99% della popolazione è tracciato, misurato e incasellato. Il sistema sa cosa compri, dove vai e, grazie all'IA, sta imparando a prevedere cosa penserai.

La via d'uscita è nel "non classificabile"
Come abbiamo detto, noi siamo come il Pi greco (π). La macchina può recintare la terra, può dividere i blocchi, può tassare il carburante, ma non può ancora imprigionare il pensiero lucido.
I flussi migratori ci sono sempre stati e sempre ci saranno: sono la prova che la vita spinge contro i confini. Ma la vera migrazione oggi è quella interna: uscire dal recinto mentale della macro-area.

• Smetti di identificarti con i consumi che ti impongono.
• Studia le dinamiche della terra e delle popolazioni.
• Riconosci che il "nemico" non è nell'altra macro-area, ma è il pastore che vuole che tu rimanga un numero finito.

Il recinto è perfetto solo se tu accetti di essere una pecora prevedibile. Nel momento in cui scegli l'intangibile e il movimento libero, la geografia dei blocchi smette di essere la tua prigione.`
      },
      {
        title: "L'Ultimo Confine: Quando il Recinto entrerà nella tua Mente",
        icon: "🧠",
        category: "mentale",
        task: "Domani, dedicati 30 minuti di silenzio. Senza telefono, senza cuffie, senza schermo.",
        content: `Negli ultimi tre secoli, la "macchina" ha recintato tutto: la terra, le materie prime, i movimenti fisici attraverso passaporti e portafogli. Ma rimaneva un'ultima zona d'ombra, un'isola di libertà dove il pastore non poteva entrare: il pensiero.
Oggi, quel confine sta per cadere. Non è più fantascienza; è la prossima fase dell'infrastruttura tecnica globale.

Dallo schermo al neurone
L'interfaccia neurale (la connessione diretta cervello-computer) viene venduta come il massimo progresso: curare malattie, potenziare la memoria, connettersi istantaneamente alla rete. Ma se guardiamo la storia della macchina, sappiamo che ogni tecnologia di "connessione" è in realtà una tecnologia di sorveglianza.
Oggi l'IA è già una forma di interfaccia esterna. Passiamo ore davanti a uno specchio digitale che impara a conoscerci, che modella le nostre idee e anticipa i nostri desideri. Il chip nel cervello sarebbe solo la chiusura del cerchio: il passaggio dal controllo del comportamento al controllo dell'impulso.

La fine del segreto
Se la macchina entra nel tuo sistema nervoso, il concetto di "privacy" svanisce. Non serviranno più telecamere satellitari per sapere dove sei o algoritmi per ipotizzare cosa pensi; il dato arriverà direttamente dalla fonte.
In un mondo di 8 miliardi di persone, il sistema vede l'imprevedibilità del singolo come un rischio. La connessione neurale è la soluzione finale del pastore per eliminare la "pecora controcorrente":
• Anestesia del dissenso: Spegnere l'ansia o la rabbia sociale prima ancora che diventino pensiero cosciente.
• La patente cognitiva: Come oggi serve la patente per guidare, domani potrebbe servire un "aggiornamento software" mentale per essere considerati cittadini idonei nel recinto.

Proteggere il Pi greco (π)
Abbiamo detto che l'essere umano è come il Pi greco: un'infinità di cifre che non si ripetono. La macchina, invece, è un numero finito: ha bisogno di limiti, di binari, di risposte "sì/no".
La nostra unica difesa è la biologia. Il cervello ha dei meccanismi di autoprotezione, quegli attimi di lucidità che ci permettono di capire quando siamo dentro un'illusione. Ma questi attimi vanno coltivati ora, prima che la tecnologia diventi parte del nostro corpo.

Come restare umani
La resistenza non è tecnologica, è spirituale e intellettuale.
1. Smetti di alimentare la macchina: Meno tempo passi a dare i tuoi dati all'IA oggi, meno lei saprà come "mapparti" domani.
2. Scegli l'analogico: Lo sport libero, il nuoto in mare, la musica dal vivo, il libro di carta. Sono esperienze che non possono essere codificate totalmente in un segnale neurale.
3. Rivendica il dubbio: La macchina vuole certezze. Il dubbio è l'unica cosa che ti mantiene "infinito".

Il recinto sta cercando di entrare dentro di te. Ma finché avrai la consapevolezza che tu sei il motore che alimenta la macchina, avrai sempre il potere di staccare la spina. Non siamo noi ad appartenere alla tecnologia; è la tecnologia che non può esistere senza il nostro "parlare".
Custodisci il tuo silenzio. È l'unica materia prima che non potranno mai comprare.`
      },
      { title: "Il sistema ha paura del tuo silenzio", category: "mentale", icon: "🤫", desc: "Perché ridurre il rumore significa ritrovare te stesso", task: "Oggi, 10 minuti di silenzio totale." },
      { title: "Lo scambio iniquo", category: "fisica", icon: "👟", desc: "Perché lavorare due mesi per scarpe da corsa è una trappola", task: "Questa settimana, prova un'attività fisica gratuita." },
      { title: "Il mare non ha fili", category: "fisica", icon: "🌊", desc: "Nuotare in mare come atto di resistenza gratuita", task: "Vai al mare. Entra in acqua." },
      { title: "300 anni di dati contro un attimo di lucidità", category: "geopolitica", icon: "🧠", desc: "L'algoritmo non può leggere il tuo silenzio", task: "Ignora un algoritmo oggi." },
    ];
    const filteredArticles = filter ? articles.filter((a) => (a as any).category === filter) : articles;
    const categories = [
      { id: null, label: "Tutti", icon: "📚" },
      { id: "fisica", label: "Sottrazione Fisica", icon: "🏃" },
      { id: "geopolitica", label: "Geopolitica", icon: "🌍" },
      { id: "mentale", label: "Indipendenza Mentale", icon: "🧠" },
    ];
    return (
      <section className="space-y-8">
        <div><h2 className="text-3xl font-semibold mb-2">Oltre il Recinto</h2><p className="text-[#a3a3a3] italic">"Non è un blog di risposte, ma uno spazio per smettere di alimentare le illusioni. Perché tu sei un π, non un numero finito."</p></div>
        <div className="bg-[#171717] border border-[#404040] rounded-xl p-6 mb-4">
          <p className="text-[#a3a3a3] leading-relaxed">
            L'essere umano è come <span className="text-[#10b981]">Pi greco</span>: un numero infinito, imprevedibile.
            Il sistema vorrebbe ridurci a un <span className="text-[#6366f1]">numero finito</span>, tracciabile, consumabile.
            Ma c'è uno spazio dove la macchina non può seguirti: l'arte, lo studio, il movimento libero.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button key={c.id as string} onClick={() => setFilter(c.id)} className={`px-3 py-1.5 rounded-lg text-xs ${filter === c.id ? "bg-[#10b981] text-[#0a0a0a]" : "bg-[#171717] text-[#a3a3a3]"}`}>{c.icon} {c.label}</button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredArticles.map((a, i) => (
            <div key={i} className="bg-[#171717] border border-[#404040] rounded-xl overflow-hidden">
              <button onClick={() => setExpandedArt(expandedArt === i ? null : i)} className="w-full p-5 flex items-center gap-3 text-left hover:bg-[#262626]/50 transition-colors">
                <span className="text-2xl">{a.icon}</span>
                <h3 className="text-lg font-semibold flex-1">{(a as any).title || a.title}</h3>
                <span className="text-[#10b981]">{expandedArt === i ? "▲" : "▼"}</span>
              </button>
              {expandedArt === i && (
                <div className="px-5 pb-5">
                  <div className="text-[#a3a3a3] whitespace-pre-line text-sm leading-relaxed mb-4">
                    {(a as any).content || a.desc}
                  </div>
                  {(a as any).task && (
                    <div className="pt-4 border-t border-[#404040]">
                      <p className="text-[#10b981] text-sm font-medium">Compito: {(a as any).task}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return null;
}

function HomeContent() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1);
      return hash || "panoramica";
    }
    return "panoramica";
  });

  const navigate = (id: string) => {
    window.location.hash = id;
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "panoramica";
      setActiveTab(hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const tabs = [
    { id: "panoramica", label: "Panoramica", icon: "📋" },
    { id: "moduli", label: "Moduli", icon: "🧩" },
    { id: "roadmap", label: "Roadmap", icon: "🗺️" },
    { id: "chat", label: "AI Chat", icon: "💬" },
    { id: "valutazione", label: "Valutazione", icon: "📊" },
    { id: "risorse", label: "Risorse", icon: "📁" },
    { id: "recinto", label: "Oltre il Recinto", icon: "🚪" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 border-b border-[#404040]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-2xl">🌱</span><span className="text-lg font-bold">Life Evolution</span></div>
          <nav className="hidden md:flex gap-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => navigate(tab.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === tab.id ? "bg-[#10b981]/20 text-[#10b981]" : "text-[#a3a3a3] hover:text-[#fafafa]"}`}>{tab.icon} {tab.label}</button>
            ))}
          </nav>
        </div>
      </header>

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Programma Integrato di<span className="block text-[#10b981]">Sviluppo Personale</span></h1>
          <p className="text-[#a3a3a3] mb-6">Un percorso evidence-informed di 12 settimane.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => navigate("moduli")} className="px-6 py-2 bg-[#10b981] text-[#0a0a0a] rounded-lg font-medium">Esplora</button>
            <button onClick={() => navigate("roadmap")} className="px-6 py-2 border border-[#404040] rounded-lg font-medium">Roadmap</button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="md:hidden flex gap-2 overflow-x-auto mb-6 pb-2">
          {tabs.map((tab) => (<button key={tab.id} onClick={() => navigate(tab.id)} className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${activeTab === tab.id ? "bg-[#10b981]/20 text-[#10b981]" : "bg-[#171717] text-[#a3a3a3]"}`}>{tab.icon} {tab.label}</button>))}
        </div>
        <TabContent activeTab={activeTab} />
      </div>

      <footer className="border-t border-[#404040] py-6 text-center text-sm text-[#a3a3a3]">
        <p>🌱 Life Evolution</p>
      </footer>
    </main>
  );
}

export default function Home() {
  return <HomeContent />;
}