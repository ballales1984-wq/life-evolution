"use client";

import { useState, useEffect } from "react";

const modules = [
  {
    id: "cognitivo",
    icon: "🧠",
    title: "Cognitivo",
    duration: "8-12 settimane",
    description: "Allenamento deliberato, microlearning, metacognizione per ottimizzare le capacità di apprendimento e problem-solving.",
    objective: "Aumento performance su test di apprendimento",
    status: "attivo",
  },
  {
    id: "emotivo",
    icon: "💚",
    title: "Emotivo",
    duration: "8-12 settimane",
    description: "Mindfulness, regolazione emotiva e CBT breve per sviluppare resilienza e benessere psicologico.",
    objective: "Miglioramento punteggio resilienza/benessere",
    status: "attivo",
  },
  {
    id: "fisico",
    icon: "⚡",
    title: "Fisico e Biologico",
    duration: "Continuo",
    description: "Ottimizzazione del sonno, nutrizione e esercizio ad alta intensità breve per massimizzare l'energia.",
    objective: "Miglioramento qualità sonno e fitness",
    status: "attivo",
  },
  {
    id: "creativo",
    icon: "🎨",
    title: "Creativo e Realizzativo",
    duration: "12 settimane",
    description: "Design sprint, prototipazione e mentorship per trasformare idee in progetti concreti.",
    objective: "Progetto concreto completato",
    status: "pianificato",
  },
  {
    id: "sociale",
    icon: "🤝",
    title: "Sociale e Civico",
    duration: "12 settimane",
    description: "Team work, leadership etica e service learning per generare impatto nella comunità.",
    objective: "Impatto misurabile su comunità locale",
    status: "pianificato",
  },
];

const timeline = [
  { week: 1, phase: "preparazione", title: "Assessment iniziale", description: "Valutazione multidimensionale e definizione KPI" },
  { week: 2, phase: "preparazione", title: "Piano personalizzato", description: "Creazione percorso su misura" },
  { week: 3, phase: "implementazione", title: "Fondamenti cognitivi", description: "Routine giornaliera, micro-obiettivi" },
  { week: 4, phase: "implementazione", title: "Fondamenti emotivi", description: "Introduzione mindfulness e CBT" },
  { week: 5, phase: "implementazione", title: "Intensificazione pratica", description: "Aumento carico di lavoro" },
  { week: 6, phase: "implementazione", title: "Progetto creativo", description: "Definizione idea e prototipazione" },
  { week: 7, phase: "implementazione", title: "Monitoraggio biologico", description: "Tracciamento sonno e attività" },
  { week: 8, phase: "implementazione", title: "Iterazione progetto", description: "Test e refinamento" },
  { week: 9, phase: "implementazione", title: "Integrazione", description: "Unione dei moduli" },
  { week: 10, phase: "implementazione", title: "Trasferimento reale", description: "Applicazione contesto quotidiano" },
  { week: 11, phase: "valutazione", title: "Valutazione intermedia", description: "Analisi pre/post, feedback" },
  { week: 12, phase: "valutazione", title: "Chiusura pilota", description: "Revisione protocolli, next steps" },
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("panoramica");
  const [scores, setScores] = useState({ cognizione: 5, emotivo: 5, fisico: 5, motivazione: 5, sociale: 5 });
  const [totalScore, setTotalScore] = useState(0);
  const [animatedValues, setAnimatedValues] = useState(kpiMetrics.map(() => 0));

  useEffect(() => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
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
      setAnimatedValues(targets.map((t) => Math.round((t * step) / steps)));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: "panoramica", label: "Panoramica", icon: "📋" },
    { id: "moduli", label: "Moduli", icon: "🧩" },
    { id: "roadmap", label: "Roadmap", icon: "🗺️" },
    { id: "valutazione", label: "Valutazione", icon: "📊" },
    { id: "risorse", label: "Risorse", icon: "📁" },
  ];

  const handleScoreChange = (dimension: string, value: number) => {
    setScores((prev) => ({ ...prev, [dimension]: value }));
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#fafafa] font-['Outfit',sans-serif]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#404040]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌱</span>
            <span className="text-xl font-bold tracking-tight">Life Evolution</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-[#10b981]/20 text-[#10b981]"
                    : "text-[#a3a3a3] hover:text-[#fafafa] hover:bg-[#171717]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
          <button className="md:hidden text-2xl">☰</button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#10b981_0%,_transparent_70%)] opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Programma Integrato di
            <span className="block text-[#10b981]">Sviluppo Personale</span>
          </h1>
          <p className="text-lg md:text-xl text-[#a3a3a3] mb-8 max-w-2xl mx-auto">
            Un percorso evidence-informed che integra cognizione, intelligenza emotiva, 
            performance fisica, creatività e impatto sociale.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("moduli")}
              className="px-8 py-3 bg-[#10b981] text-[#0a0a0a] rounded-xl font-semibold hover:bg-[#34d399] transition-colors"
            >
              Esplora i Moduli
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className="px-8 py-3 border border-[#404040] rounded-xl font-semibold hover:bg-[#171717] transition-colors"
            >
              Vedi Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Tab Navigation Mobile */}
        <div className="md:hidden mb-8 overflow-x-auto flex gap-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#10b981]/20 text-[#10b981]"
                  : "bg-[#171717] text-[#a3a3a3]"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Panoramica Tab */}
        {activeTab === "panoramica" && (
          <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Il Programma</h2>
              <p className="text-[#a3a3a3] leading-relaxed mb-8">
                Life Evolution è un programma evidence-informed, modulare e scalabile progettato 
                per promuovere lo sviluppo integrale della persona. Sperimentato in un pilota di 
                12 settimane, utilizza principi di Evidence-Based Management per garantire risultati misurabili.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#171717] border border-[#404040] rounded-xl p-6 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Obiettivi SMART</h3>
                <p className="text-[#a3a3a3] text-sm">
                  Ogni partecipante definisce obiettivi Specifici, Misurabili, Achievable, Realistici e Temporalmente definiti.
                </p>
              </div>
              <div className="bg-[#171717] border border-[#404040] rounded-xl p-6 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-2">Cicli di Sperimentazione</h3>
                <p className="text-[#a3a3a3] text-sm">
                  Prototipare, misurare, adattare: iterazioni rapide basate su dati reali.
                </p>
              </div>
              <div className="bg-[#171717] border border-[#404040] rounded-xl p-6 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">Supporto Sociale</h3>
                <p className="text-[#a3a3a3] text-sm">
                  Gruppi di apprendimento, accountability partner e coaching individuale.
                </p>
              </div>
            </div>

            <div className="bg-[#171717] border border-[#404040] rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-[#10b981]"> Principi Operativi</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#10b981]">✓</span>
                  <span><strong>Assessment multidimensionale</strong> - Valutazione completa di cognizione, emozioni, salute, motivazione e contesto sociale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10b981]">✓</span>
                  <span><strong>Progettazione modulare personalizzata</strong> - Percorso composto da 3-5 moduli prioritari adattati al profilo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10b981]">✓</span>
                  <span><strong>Micro-interventi quotidiani</strong> - Routine giornaliera di 45-60 minuti combinata con sessioni settimanali</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10b981]">✓</span>
                  <span><strong>Valutazione continua</strong> - Misure pre/post, controllo su gruppi, analisi qualitativa</span>
                </li>
              </ul>
            </div>
          </section>
        )}

        {/* Moduli Tab */}
        {activeTab === "moduli" && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Moduli del Programma</h2>
              <p className="text-[#a3a3a3]">Cinque aree di sviluppo integrate per una crescita olistica.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, idx) => (
                <div
                  key={module.id}
                  className="bg-[#171717] border border-[#404040] rounded-xl p-6 hover:-translate-y-1 hover:border-[#10b981]/50 transition-all duration-200 group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{module.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold">{module.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          module.status === "attivo" 
                            ? "bg-[#10b981]/20 text-[#10b981]" 
                            : "bg-[#f59e0b]/20 text-[#f59e0b]"
                        }`}>
                          {module.status === "attivo" ? "● Attivo" : "○ Pianificato"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#a3a3a3] text-sm mb-4">{module.description}</p>
                  <div className="flex items-center justify-between text-sm pt-4 border-t border-[#404040]">
                    <span className="text-[#6366f1]">⏱️ {module.duration}</span>
                    <span className="text-[#10b981]">📈 {module.objective}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Roadmap Tab */}
        {activeTab === "roadmap" && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Roadmap 12 Settimane</h2>
              <p className="text-[#a3a3a3]">Il percorso pilota strutturato in quattro fasi operative.</p>
            </div>

            <div className="grid gap-4">
              {timeline.map((item, idx) => (
                <div
                  key={item.week}
                  className={`relative flex gap-4 p-4 rounded-xl border transition-all hover:-translate-y-1 ${
                    item.phase === "preparazione"
                      ? "bg-[#6366f1]/10 border-[#6366f1]/30"
                      : item.phase === "implementazione"
                      ? "bg-[#10b981]/10 border-[#10b981]/30"
                      : "bg-[#f59e0b]/10 border-[#f59e0b]/30"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                    item.phase === "preparazione"
                      ? "bg-[#6366f1] text-white"
                      : item.phase === "implementazione"
                      ? "bg-[#10b981] text-[#0a0a0a]"
                      : "bg-[#f59e0b] text-[#0a0a0a]"
                  }`}>
                    {item.week}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-[#a3a3a3]">{item.description}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full self-start ${
                    item.phase === "preparazione"
                      ? "bg-[#6366f1]/20 text-[#6366f1]"
                      : item.phase === "implementazione"
                      ? "bg-[#10b981]/20 text-[#10b981]"
                      : "bg-[#f59e0b]/20 text-[#f59e0b]"
                  }`}>
                    {item.phase === "preparazione" ? "Fase 1" : item.phase === "implementazione" ? "Fase 2" : "Fase 3"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Valutazione Tab */}
        {activeTab === "valutazione" && (
          <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Strumenti di Valutazione</h2>
              <p className="text-[#a3a3a3]">Metriche e strumenti per misurare i progressi.</p>
            </div>

            {/* KPI Cards */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Metriche Chiave</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {kpiMetrics.map((kpi, idx) => (
                  <div key={idx} className="bg-[#171717] border border-[#404040] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{kpi.icon}</span>
                      <span className="text-[#a3a3a3]">{kpi.label}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-[#10b981]">{animatedValues[idx]}</span>
                      <span className="text-sm text-[#a3a3a3] mb-1">/100</span>
                    </div>
                    <div className="mt-3 h-2 bg-[#262626] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#10b981] rounded-full transition-all duration-1000"
                        style={{ width: `${animatedValues[idx]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Form */}
            <div className="bg-[#171717] border border-[#404040] rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Auto-Valutazione Iniziale</h3>
              <p className="text-[#a3a3a3] mb-8">
                Valuta il tuo livello attuale in ciascuna dimensione (1-5).
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {Object.entries(scores).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-2">
                        <span className="capitalize">{key}</span>
                        <span className="text-[#10b981] font-medium">{value}/5</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={value}
                        onChange={(e) => handleScoreChange(key, parseInt(e.target.value))}
                        className="w-full h-2 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col items-center justify-center bg-[#0a0a0a] rounded-xl p-6">
                  <span className="text-[#a3a3a3] mb-2">Punteggio Totale</span>
                  <span className="text-6xl font-bold text-[#10b981]">{totalScore}</span>
                  <span className="text-sm text-[#a3a3a3]">/100</span>
                  <p className="mt-4 text-center text-sm text-[#a3a3a3]">
                    {totalScore < 40 ? "Area di miglioramento significativa" :
                     totalScore < 60 ? "Buona base da consolidare" :
                     totalScore < 80 ? "Livello solido, spazio per crescita" :
                     "Eccellente punto di partenza!"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Risorse Tab */}
        {activeTab === "risorse" && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Risorse e Download</h2>
              <p className="text-[#a3a3a3]">Materiali per il pilota 12 settimane.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {resources.map((resource, idx) => (
                <div
                  key={idx}
                  className="bg-[#171717] border border-[#404040] rounded-xl p-4 flex items-center justify-between hover:-translate-y-1 transition-transform cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">📄</span>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <span className="text-sm text-[#a3a3a3]">{resource.type} • {resource.size}</span>
                    </div>
                  </div>
                  <span className="text-[#10b981] text-xl">↓</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#10b981]/20 to-[#6366f1]/20 border border-[#10b981]/30 rounded-xl p-8 mt-8">
              <h3 className="text-xl font-semibold mb-4">Riferimenti Evidence-Based</h3>
              <ul className="space-y-2 text-sm text-[#a3a3a3]">
                <li>• <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11505461/" className="text-[#10b981] hover:underline" target="_blank">PMC - Program Development Research</a></li>
                <li>• <a href="https://casel.org/wp-content/uploads/2021/01/11_CASEL-Program-Criteria-Rationale.pdf" className="text-[#10b981] hover:underline" target="_blank">CASEL - Program Criteria</a></li>
                <li>• <a href="https://www.scrum.org/resources/evidence-based-management" className="text-[#10b981] hover:underline" target="_blank">Scrum.org - EBM Guide</a></li>
                <li>• <a href="https://positivepsychology.com/personal-development-plan/" className="text-[#10b981] hover:underline" target="_blank">PositivePsychology - PDP Guide</a></li>
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#404040] py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-[#a3a3a3]">
          <p>🌱 Life Evolution - Programma Evidence-Informed di Sviluppo Personale</p>
          <p className="mt-2">Basato su CASEL, EBM e ricerche PMC</p>
        </div>
      </footer>
    </main>
  );
}
