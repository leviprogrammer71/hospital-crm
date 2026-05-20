# Prompt: Full CRM UI Redesign — Clinique The Grace of God

Copy and paste everything below the line into Claude. Attach the `hospital-crm.html` file when you do.

---

## Context

I'm building a **production hospital CRM** for **Clinique The Grace of God** — a real medical clinic in Kinshasa, RDC (Democratic Republic of Congo). The attached `hospital-crm.html` is the current working version: a single-file React 18 + Babel standalone app backed by Supabase (PostgreSQL + Realtime). It works, but the UI needs a professional-grade redesign to match a real clinical environment.

## What the CRM Does

This is a **multi-department hospital management system** used simultaneously by 19+ staff across 6 departments on different devices:

- **Réception** — Registers new patients, searches patient database
- **Pharmacie (Caisse)** — Processes all payments, manages drug inventory, dispenses prescriptions, financial reports
- **Infirmier** — Takes vital signs (temperature, blood pressure, SpO2, weight, triage classification)
- **Médecin** — Full consultation: diagnosis, lab orders, prescriptions, confidential notes, insurance assignment
- **Laboratoire** — Receives lab orders, enters results, sends back to doctor
- **Admin / Super Admin** — Dashboard with KPIs, staff directory with live online/offline presence, full patient database, confidential notes access, system settings

## Patient Flow (State Machine)

Patients move through a 7-step workflow and frequently go **back and forth** between departments:

```
Réception (step 0) → Pharmacie/Paiement consultation (1) → Infirmier/Vitaux (2) → Médecin (3) → Pharmacie/Labo+Méds (4) → Laboratoire (5) → Pharmacie/Sortie (6) → Terminé (7)
```

Patient cards must **never disappear** from any view — doctors see all their assigned patients regardless of current step. Each department can edit patient info and see a live activity feed.

## Technical Constraints (DO NOT CHANGE)

- **Single HTML file** — React 18 + Babel standalone via CDN (no build step, no Node, no Vite)
- **Supabase JS v2 via CDN** — All data in PostgreSQL with Realtime subscriptions for multi-device sync
- **Supabase Presence** — Tracks online/offline staff
- **No external CSS frameworks** — All styles are inline `<style>` block
- **Must deploy on Vercel** as a static site
- **Keep ALL existing functionality** — Every feature, every button, every data flow must remain intact
- **Keep the same component structure** — `App`, `LoginPage`, `DashLayout`, `FrontDeskView`, `NurseView`, `DoctorView`, `DoctorConsult`, `LabView`, `PharmacyView`, `AdminView`, `PatientDossier`, `EditPatientModal`, `PatientActivityFeed`, `AIAssistant`, etc.
- **Keep the existing Supabase connection, STAFF_DB, and all database operations exactly as they are**
- **French language throughout** — All UI labels, messages, and toasts must remain in French

## What I Want Redesigned

### 1. Visual Design System

- **Color palette**: The current palette (`--primary:#1a3c34`, green-gold medical theme) is fine as a base but needs more depth. Add proper color scales (50-900) for primary, secondary, accent, and semantic colors (success, warning, danger, info). The clinic's identity is a cross/medical/spiritual theme — "Sauver des vies, gagner des âmes."
- **Typography**: The Inter font is good. Improve the type scale — right now everything looks too uniform. Create clear visual hierarchy: page titles, section headers, body text, captions, metadata.
- **Spacing & rhythm**: The current spacing is inconsistent. Establish a proper spacing scale (4px base grid) and apply it consistently.
- **Border radius**: Standardize to 2-3 options (small, medium, large) instead of arbitrary values.
- **Shadows**: Create a proper elevation system (1-4 levels) instead of random shadow values.

### 2. Layout & Navigation

- **Sidebar**: The current sidebar is functional but basic. Make it feel more premium — better active state indicators, subtle hover animations, section dividers between nav groups, collapse/expand on mobile.
- **Top bar**: Add a persistent top bar showing: logged-in user name + avatar initials, current department/view name, a clock updating every minute, the notification bell (currently floating), and a quick-search shortcut.
- **Content area**: Better use of max-width constraints so content doesn't stretch too wide on large monitors. Add subtle page transitions between tabs.

### 3. Component Redesign

#### Login Page
- More polished. Clinic logo prominent. Subtle background pattern or gradient. The login card should feel premium — softer shadows, slightly larger, gentle entrance animation.

#### Patient Cards
- Currently just white cards with a colored left border. Redesign to show:
  - Patient avatar (initials circle with gender-based color)
  - Clear status indicator (current step in the flow, visually prominent)
  - Insurance badge should be color-coded per type
  - The patient flow stepper (`flow-step` classes) needs to be a proper visual pipeline — connected dots/bars, not just a row of tiny pills
  - Activity feed items need better visual separation and iconography

#### Data Tables
- Current tables are plain. Add:
  - Sticky headers on scroll
  - Alternating row colors (subtle)
  - Better hover states
  - Proper alignment (numbers right-aligned, text left-aligned)
  - Empty state illustrations (not just text)

#### Stats Cards (Dashboard)
- The stats grid is functional but needs polish. Add micro-icons, trend indicators (up/down arrows), and make them visually distinct by category.

#### Forms
- Input fields need better focus states, validation indicators, and proper disabled styles.
- Buttons should have clear visual hierarchy: primary action always obvious, secondary actions receded.
- Add proper loading spinners inside buttons (the `btn.loading` class exists but needs animation).

#### Modals (Patient Dossier, Edit Patient)
- The patient dossier modal is the most important view. Make it feel like a real medical chart:
  - Tabbed sections instead of one long scroll (Demographics, Vitaux, Labo, Prescriptions, Paiements, Chronologie)
  - Better vitals display — mini gauge cards or colored indicators
  - Timeline should look like a real timeline, not just a list

#### Toast Notifications
- Already functional (ToastProvider). Improve animations — slide + fade from right. Add an icon per type. Close button should be more subtle.

#### Notification Panel
- The doctor's notification panel needs better visual treatment: unread items should stand out more, add timestamps like "il y a 5 min", group by patient.

### 4. Department-Specific Polish

#### Pharmacie/Caisse
- The payment entry is the most used screen. The amount input needs to be large, prominent, with the CDF currency clearly shown. The suggested amount should pre-fill. The "Payer" button should be impossible to miss.
- Financial reports need proper chart visualizations — at minimum, a bar chart for revenue by insurance type (use pure SVG, no library).

#### Médecin
- The consultation card is dense. Improve information hierarchy so the doctor's eye naturally flows: patient info → vitals → existing results → actions (prescribe, order lab, notes).
- The "Mes Patients" tab needs status-at-a-glance for each patient — where are they, how long have they been waiting.

#### Laboratoire
- Pending orders should show urgency levels (from doctor's triage). Results input needs to be a larger, more comfortable text area.

### 5. Responsive & Performance

- Tablet-first design (most devices at the clinic are tablets)
- Sidebar should collapse to icons on smaller screens, completely hide on phone
- All tables should scroll horizontally on small screens
- Touch-friendly: minimum 44px tap targets
- Use CSS `contain: content` on heavy lists for paint performance
- Add `will-change: transform` only on elements that animate

### 6. Print Stylesheet

- The admin should be able to print financial reports and patient dossiers. Add `@media print` styles that:
  - Hide sidebar, navigation, AI assistant
  - Show clinic logo + header on printed page
  - Format tables properly for paper
  - Add page breaks between dossier sections

### 7. Accessibility

- Proper focus outlines on all interactive elements (visible, not just browser default)
- ARIA labels on icon-only buttons
- Color contrast: ensure all text meets WCAG AA (4.5:1 ratio)
- Role attributes on major landmark regions

## What NOT to Do

- Do NOT add any npm packages or build tools
- Do NOT change the Supabase connection, queries, or data model
- Do NOT change the STAFF_DB credentials or login logic
- Do NOT remove any existing functionality
- Do NOT add external CSS frameworks (no Tailwind, no Bootstrap)
- Do NOT split into multiple files — keep everything in one HTML file
- Do NOT change the component names or their prop interfaces
- Do NOT add any new database tables or columns

## Deliverable

Return the complete redesigned `hospital-crm.html` file — one single file, fully functional, with all existing features intact and the new visual design applied. The file should be production-ready: someone should be able to drop it on Vercel and hand it to a clinic receptionist.
