Banking Application



📋 Table of Contents

🤖 Introduction
⚙️ Tech Stack
🔋 Features
🤸 Quick Start
🕸️ Code Snippets
🔗 Assets

🤖 Introduction
Built with Next.js, this banking application is a financial SaaS platform that enables users to connect multiple bank accounts, view real-time transactions, transfer funds to other users, and manage their finances seamlessly.
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
ShadCN

🔋 Features

Authentication: Secure server-side rendering (SSR) authentication with robust validations and authorization.
Connect Banks: Integration with Plaid to link multiple bank accounts.
Home Page: Displays an overview of user accounts, including total balance, recent transactions, and spending categorized by type.
My Banks: Lists all connected bank accounts with detailed balance and account information.
Transaction History: Supports pagination and filtering for viewing transaction history across different banks.
Real-time Updates: Automatically updates relevant pages when new bank accounts are connected.
Funds Transfer: Facilitates fund transfers to other accounts using Dwolla, with required fields and recipient bank ID.
Responsiveness: Adapts seamlessly to various screen sizes and devices for a consistent user experience.

Additional features include optimized code architecture and reusability.
🤸 Quick Start
Follow these steps to set up the project locally.
Prerequisites
Ensure the following are installed:

Git
Node.js
npm

Cloning the Repository
git clone https://github.com/your-username/banking-app.git
cd banking-app

Installation
Install project dependencies:
npm install

Set Up Environment Variables
Create a .env file in the project root and add the following:
#NEXT
NEXT_PUBLIC_SITE_URL=

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=
PLAID_PRODUCTS=
PLAID_COUNTRY_CODES=

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

Replace placeholder values with your actual credentials from Appwrite, Plaid, and Dwolla.
Running the Project
npm run dev

Open http://localhost:3000 in your browser to view the project.
🕸️ Code Snippets
.env.example
#NEXT
NEXT_PUBLIC_SITE_URL=

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

exchangePublicToken.ts
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    if (!fundingSourceUrl) throw Error;

    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    revalidatePath("/");

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while exchanging token:", error);
  }
};
