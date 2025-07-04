💰 Banking Application
A modern, full-stack financial SaaS platform built with Next.js that allows users to connect bank accounts, manage finances, and transfer funds securely.

📋 Table of Contents
🤖 Introduction

⚙️ Tech Stack

🔋 Features

🤸 Quick Start

🕸️ Code Snippets

🔗 Assets

🤖 Introduction
This banking application is a financial SaaS platform built with Next.js that enables users to:

Connect multiple bank accounts via Plaid

View real-time transactions

Transfer funds using Dwolla

Manage personal finances efficiently

⚙️ Tech Stack
Next.js

TypeScript

Appwrite

Plaid

Dwolla

React Hook Form

Zod

TailwindCSS

Chart.js

ShadCN/UI

🔋 Features
Authentication
Secure SSR authentication with validations and role-based access.

Bank Connectivity
Integrates with Plaid to securely connect multiple bank accounts.

Dashboard
Overview of total balance, categorized transactions, and summaries.

My Banks
View all connected banks with details like account type and balance.

Transaction History
Paginated and filterable transaction logs for all connected accounts.

Real-time Sync
Auto-refreshes dashboards and transaction views when accounts update.

Fund Transfers
Transfers via Dwolla, complete with validations and recipient lookup.

Responsive Design
Seamlessly adapts across all screen sizes and devices.

Clean Architecture
Modular, reusable components and services for scalability.

🤸 Quick Start
✅ Prerequisites
Make sure you have:

Node.js

npm

Git

🧱 Setup
Clone the repository

git clone 
cd banking
Install dependencies

bash
Kopieren
Bearbeiten
npm install
Set environment variables

Create a .env file in the root of the project and populate it like this:



<details> <summary><strong>.env.example</strong></summary>
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

</details>

export const exchangePublicToken = async ({
  publicToken,
  user,
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
  }
};
