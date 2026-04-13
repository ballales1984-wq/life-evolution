# Life Evolution - Programma di Sviluppo Personale

## Project Overview
- **Project name**: Life Evolution
- **Type**: Single-page interactive webapp (Next.js)
- **Core functionality**: Presentare il programma evidence-informed di sviluppo personale integrato con moduli interattivi, calendario, assessment e strumenti di misurazione
- **Target users**: Adulti motivati, professionisti HR, coach, formatori

## UI/UX Specification

### Layout Structure
- **Header**: Logo "Life Evolution" + navigazione modulare a tab
- **Hero**: Titolo principale + sottotitolo + CTA
- **Sezioni principali**:
  1. Panoramica programma (tab)
  2. Moduli (tab)
  3. Roadmap 12 settimane (tab)
  4. Strumenti valutazione (tab)
  5. Risorse (tab)
- **Footer**: Crediti + link

### Responsive Breakpoints
- Mobile: < 768px (layout verticale, stacked cards)
- Tablet: 768px - 1024px
- Desktop: > 1024px (layout multi-colonna)

### Visual Design

#### Color Palette
- **Background**: `#0a0a0a` (nero profondo)
- **Surface**: `#171717` (card sfumature)
- **Surface hover**: `#262626`
- **Primary**: `#10b981` (smeraldo - crescita)
- **Primary light**: `#34d399`
- **Secondary**: `#f59e0b` (ambra - energia)
- **Accent**: `#6366f1` (indaco - intuizione)
- **Text primary**: `#fafafa`
- **Text secondary**: `#a3a3a3`
- **Border**: `#404040`

#### Typography
- **Font family**: "Outfit" (Google Fonts) - moderno, pulito, senza grazie
- **Headings**: 
  - H1: 56px / 700 weight
  - H2: 36px / 600 weight
  - H3: 24px / 600 weight
- **Body**: 16px / 400 weight
- **Small**: 14px / 400 weight

#### Spacing System
- Section padding: 80px vertical
- Card padding: 24px
- Gap tra elementi: 16px / 24px / 32px

#### Visual Effects
- Card: `border: 1px solid #404040`, `border-radius: 12px`
- Hover: `transform: translateY(-2px)`, transizione 200ms
- Glow effect su elementi primary: `box-shadow: 0 0 30px rgba(16, 185, 129, 0.2)`
- Gradient hero: radial da centro con smeraldo
- Tab active: underline animata

### Components

#### Tab Navigation
- 5 tabs orizzontali con icona + label
- Stato active: underline verde + testo white
- Transizione smooth tra contenuti

#### Module Cards
- Icona modulo (emoji)
- Titolo + descrizione breve
- Durata + obiettivo misurabile
- Badge per stato (attivo/pianificato)

#### Timeline Settimanale
- Griglia 12 settimane
- Colori per fase (preparazione, implementazione, valutazione)
- Eventi milestone con tooltip

#### KPI Cards
- Layout griglia 3x2
- Icona metrica + nome
- Valore numerico placeholder
- Trend indicator

#### Assessment Form
- Select per dimensione
- Range slider per auto-valutazione
- Pulsante calcolo risultato

## Functionality Specification

### Core Features
1. **Navigazione tab**:切换 tra le 5 sezioni senza ricarica
2. **Moduli interattivi**: hover per dettagli, click espandi
3. **Timeline animata**: scroll-reveal per settimane
4. **Calculator KPI**: calcolatore punteggio sviluppo
5. **Download risorse**: pulsanti per PDF template (mock)

### User Interactions
- Click tab → mostra sezione corrispondente
- Hover card → effetto lift + glow
- Scroll → animazioni fade-in sezioni
- Click "Inizia Programma" → smooth scroll a sezione moduli

### Data Handling
- Nessun backend richiesto
- State locale per tab attivo
- Form assessment calcola in locale

## Acceptance Criteria
1. ✓ Page carica senza errori
2. ✓ Tutti i 5 tab funzionano correttamente
3. ✓ Timeline 12 settimane visualizzata
4. ✓ 5 moduli mostrati con dettagli
5. ✓ Form assessment calcola risultato
6. ✓ Design responsive su mobile
7. ✓ Animazioni smooth
8. ✓ Colori e typography come specificato
