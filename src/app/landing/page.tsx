"use client";

import { useState } from "react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#10b981] font-medium"> Programma gratuito </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Life Evolution
            <span className="block text-[#10b981]">Programma di Crescita Personale</span>
          </h1>
          <p className="text-xl text-[#a3a3a3] mb-8">
            Trasforma abitudini, misura i risultati e costruisci una routine che dura. 
            12 settimane per cambiare la tua vita.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                className="flex-1 bg-[#171717] border border-[#404040] rounded-lg px-4 py-3 text-[#fafafa] placeholder-[#a3a3a3]"
                required
              />
              <button type="submit" className="bg-[#10b981] text-[#0a0a0a] px-6 py-3 rounded-lg font-medium hover:bg-[#0d9668] transition-colors">
                Iscriviti gratis
              </button>
            </form>
          ) : (
            <div className="bg-[#171717] border border-[#10b981]/30 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-[#10b981] font-medium">✓ Grazie per esserti iscritto!</p>
              <p className="text-[#a3a3a3] mt-2">Riceverai a breve le istruzioni per iniziare.</p>
            </div>
          )}
          <p className="text-sm text-[#a3a3a3] mt-4">Nessun costo, nessuna carta di credito</p>
        </div>
      </section>

      {/* Per chi è */}
      <section className="py-16 px-4 bg-[#171717]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Per chi è</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#262626] p-6 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Vuole risultati concreti</h3>
              <p className="text-[#a3a3a3]">Non cerca motivazione vuota, ma un percorso basato su dati e sperimentazione.</p>
            </div>
            <div className="bg-[#262626] p-6 rounded-xl">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="text-lg font-semibold mb-2">Desidera una routine sostenibile</h3>
              <p className="text-[#a3a3a3]">Vuole costruire abitudini che durano nel tempo, non diete lampo.</p>
            </div>
            <div className="bg-[#262626] p-6 rounded-xl">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold mb-2"> cerca supporto sociale</h3>
              <p className="text-[#a3a3a3]">Vuole una community di persone con obiettivi simili.</p>
            </div>
            <div className="bg-[#262626] p-6 rounded-xl">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Vuole misurare i progressi</h3>
              <p className="text-[#a3a3a3]"> Preferisce approcci misurabili alla crescita personale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa include */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Cosa include il programma</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-[#171717] rounded-xl">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold">12 micro-lezioni settimanali</h3>
                <p className="text-[#a3a3a3]">Contenuti pratici da 30-60 minuti, immediatamente applicabili.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#171717] rounded-xl">
              <span className="text-2xl">📄</span>
              <div>
                <h3 className="font-semibold">Workbook PDF</h3>
                <p className="text-[#a3a3a3]">Schede pratiche, diario serale e template KPI SMART.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#171717] rounded-xl">
              <span className="text-2xl">💬</span>
              <div>
                <h3 className="font-semibold">Community Discord</h3>
                <p className="text-[#a3a3a3]"> accountability partner e supporto tra partecipanti.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#171717] rounded-xl">
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="font-semibold">Flusso onboarding email</h3>
                <p className="text-[#a3a3a3]">6 email che ti guidano dalla registrazione al primo check-in.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#171717] rounded-xl">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-semibold">Questionari di progresso</h3>
                <p className="text-[#a3a3a3]">Assessment iniziale e finale per misurare la crescita.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="py-16 px-4 bg-[#171717]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Come funziona</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Iscriviti gratis</h3>
              <p className="text-[#a3a3a3] text-sm">Inserisci la tua email</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Ricevi accesso</h3>
              <p className="text-[#a3a3a3] text-sm">Email con link e materiali</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Parti con la settimana 1</h3>
              <p className="text-[#a3a3a3] text-sm">Assessment e KPI</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-semibold mb-2">Misura risultati</h3>
              <p className="text-[#a3a3a3] text-sm">Traccia i tuoi progressi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Pronto a iniziare?</h2>
          <p className="text-[#a3a3a3] mb-8">Iscriviti gratis ora. Non hai nulla da perdere.</p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                className="flex-1 bg-[#171717] border border-[#404040] rounded-lg px-4 py-3 text-[#fafafa] placeholder-[#a3a3a3]"
                required
              />
              <button type="submit" className="bg-[#10b981] text-[#0a0a0a] px-6 py-3 rounded-lg font-medium hover:bg-[#0d9668] transition-colors">
                Iscriviti gratis
              </button>
            </form>
          ) : (
            <div className="bg-[#171717] border border-[#10b981]/30 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-[#10b981] font-medium">✓ Grazie per esserti iscritto!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-[#a3a3a3] border-t border-[#262626]">
        <p>© 2026 Life Evolution. Tutti i diritti riservati.</p>
        <p className="mt-2">Il materiale non sostituisce consulenza professionale.</p>
      </footer>
    </div>
  );
}