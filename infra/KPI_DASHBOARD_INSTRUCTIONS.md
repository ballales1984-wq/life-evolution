# KPI Dashboard — Istruzioni per il Monitoraggio

Guida pratica per tracciare le metriche del programma Life Evolution.

---

## Metriche Principali da Tracciare

| Metrica | Descrizione | Frequenza | Fonte |
|--------|------------|----------|-------|
| Iscritti totali | Email raccolte | Continuo | MailerLite/email tool |
| Iscritti attivi settimanali | Utenti che aprono email o accedono a Discord | Settimanale | Export + report Discord |
| Completamento | Utenti che completano 4 schede | Settimanale | Workbook tracking |
| Engagement community | Utenti che postano almeno 1 volta | Settimanale | Analytics Discord |
| NPS | Net Promoter Score | Fine pilot | Google Forms |
| Tasso conversione | Visitatori → Iscritti | Continuo | Analytics landing |

---

## Setup Foglio Google

### Struttura Colonne

| A | B | C | D | E | F | G | H | I |
|----|----|----|----|----|----|----|----|---|---|
| Data | Email | Stato | Settimana | KPI1 | KPI2 | KPI3 | Note | NPS |

### Spiegazione Colonne

- **A — Data**: Data iscrizione o aggiornamento
- **B — Email**: Email partecipante
- **C — Stato**: (onboarding / attivo / disattivo / completato)
- **D — Settimana**: (1-12)corrente
- **E — KPI1**: Primo obiettivo
- **F — KPI2**: Secondo obiettivo  
- **G — KPI3**: Terzo obiettivo
- **H — Note**: Note interne
- **I — NPS**: Punteggio (1-10) a fine pilot

---

## Fonti Dati e Update

### Iscritti (MailerLite)

1. Esporta lista contatti settimanalmente
2. Filtra per:
   - Nuovi iscritti (ultimi 7 giorni)
   - Disdetti (opt-out)
3. Copia in foglio KPI

### Attivi Settimanali (Email)

1. Trova tasso di apertura nell'export
2. Calcola: aperture ÷ invii × 100 = %
3. Confronta con settimana precedente

### Attivi Discord

1. Vai in Server Settings → Insights
2. Nota utenti attivi (messaggi/voce)
3. Traduci in percentuale su totale iscritti

### Completamento 4 Settimane

1. Controlla workbook/tracking sheet
2. Conta quanti hanno completato almeno 4 schede
3. Calcola: completati ÷ iscritti attivi × 100

---

## Survey NPS (Google Forms)

### Setup 1. Crea Form con Domande:

1. Su una scala di 1-10, quanto consiglieresti Life Evolution a un amico?
2. Cosa ti è piaciuto di più?
3. Cosa miglioreresti?
4. Vuoi lasciare una testimonianza? (campo testo libero)

### Setup 2. Invia

- Invia link con email 5 (feedback)
- O con reminder a fine pilot (settimana 12)

### Setup 3. Registra Risultato

- Esporta risultati → Media = NPS
- Segna in colonna I del foglio KPI

---

## Target Iniziali

| Metrica | Target 4 settimane |
|--------|-----------------|
| Iscritti | 200-500 utenti |
| Completamento 4 settimane | 30-50% |
| Engagement | 10-20% iscritti |
| NPS | ≥30 |

---

## Dashboard Visiva (Opzionale)

### Google Data Studio / Looker Studio

1. Collega foglio KPI come fonte dati
2. Crea grafici:
   - Linea: Iscritti nel tempo
   - Pie: Stato distribuzione
   - Bar: Completamento per settimana

### Alert Automatici (automazione semplice)

- **Iscritti < 20/settimana** → notify
- **Engagement < 5%** → notify
- **NPS < 20** → notify

---

## Checklist Settimanale

- [ ] Esporta lista email → aggiorna foglio
- [ ] Calcola tasso aperture settimanali
- [ ] estrai utenti attivi Discord
- [ ] Aggiorna stato (% completamento)
- [ ] Prepara report per team (opzionale)

---

*Ultimo aggiornamento: 2026-04-15*