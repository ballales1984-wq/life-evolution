"use client";

import { Suspense, useState, useEffect, useRef } from "react";

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

  return null;
}

function HomeContent() {
  const [activeTab, setActiveTab] = useState("panoramica");

  const navigate = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabs = [
    { id: "panoramica", label: "Panoramica", icon: "📋" },
    { id: "moduli", label: "Moduli", icon: "🧩" },
    { id: "roadmap", label: "Roadmap", icon: "🗺️" },
    { id: "chat", label: "AI Chat", icon: "💬" },
    { id: "valutazione", label: "Valutazione", icon: "📊" },
    { id: "risorse", label: "Risorse", icon: "📁" },
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
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex items-center justify-center"><p className="text-[#a3a3a3]">Caricamento...</p></div>}>
      <HomeContent />
    </Suspense>
  );
}