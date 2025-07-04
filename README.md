# 💰 Banking Application

Eine moderne, vollständige Banking-SaaS-Plattform, gebaut mit **Next.js**, die es Nutzer:innen ermöglicht, Bankkonten zu verbinden, Transaktionen in Echtzeit zu sehen, Geld zu überweisen und ihre Finanzen effizient zu verwalten.

---

## 📋 Table of Contents

- [🤖 Introduction](#-introduction)  
- [⚙️ Tech Stack](#-tech-stack)  
- [🔋 Features](#-features)  
- [🤸 Quick Start](#-quick-start)  
- [🕸️ Code Snippets](#-code-snippets)  
- [🔗 Assets](#-assets)

---

## 🤖 Introduction

Dieses Projekt ist eine Finanzplattform, die folgende Kernfunktionen bietet:

- Verknüpfung mehrerer Bankkonten via **Plaid**
- Realtime-Transaktionen
- Geldüberweisungen via **Dwolla**
- Benutzerfreundliches und responsives Design

---

## ⚙️ Tech Stack

- **Next.js**
- **TypeScript**
- **Appwrite**
- **Plaid**
- **Dwolla**
- **React Hook Form**
- **Zod**
- **TailwindCSS**
- **Chart.js**
- **ShadCN/UI**

---

## 🔋 Features

- **🔐 Authentifizierung**  
  Sichere SSR-basierte Authentifizierung mit Validierung und Autorisierung

- **🏦 Bankverbindung**  
  Mehrere Bankkonten via Plaid verbinden und verwalten

- **📊 Dashboard**  
  Übersicht über Kontostände, Transaktionen und Ausgaben nach Kategorie

- **🏁 Transaktionsverlauf**  
  Pagination, Filter und Übersicht über alle verknüpften Konten

- **📡 Realtime Updates**  
  Neue Bankverbindungen aktualisieren automatisch relevante Seiten

- **💸 Geldüberweisung**  
  Sichere Überweisungen mit Dwolla, inkl. Empfängerprüfung

- **📱 Responsives UI**  
  Optimiert für alle Geräte und Bildschirmgrößen

---

## 🤸 Quick Start

### ✅ Voraussetzungen

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### 🚀 Setup

```bash
git clone https://github.com/your-username/banking-app.git
cd banking-app
npm install
```

### 🔐 Umgebungsvariablen

Erstelle eine `.env`-Datei im Root-Verzeichnis:

```env
# NEXT
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

# PLAID
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

# DWOLLA
DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

### ▶️ Projekt starten

```bash
npm run dev
```

👉 Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

---

## 🕸️ Code Snippets

### `.env.example`

```env
# NEXT
NEXT_PUBLIC_SITE_URL=

# APPWRITE
# APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

# PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

# DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

---

### `exchangePublicToken.ts`

```ts
export const exchangePublicToken = async ({
  publicToken,
  user,
}: {
  publicToken: string;
  user: User;
}) => {
}: {
  publicToken: string;
  user: User;
}) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;

    // Store accessToken securely (e.g., Appwrite DB)
  } catch (error) {
    console.error("Token exchange failed:", error);
    console.error("Token exchange failed:", error);
  }
};
```

---



---