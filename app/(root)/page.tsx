import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { get } from "http";
import React from "react";

const Home = async ({ searchParams: { id, page }}: SearchParamProps ) => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn?.$id });
  if(!accounts) return;
  const accoountsData = accounts?.data;
  const appwriteItemId = (id as string) || accoountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });
  // console.log({ accoountsData ,account });
  return (

    <>
      <div className="home">
        <div className="home-content">
          <header className="home-header">
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || "guest"}
              subtext="Acces and manage your account and transactions effectively"
            />
            <TotalBalanceBox
              accounts={accoountsData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance}
            />
          </header>
        </div>

         <RecentTransactions
          accounts={accoountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={1}
        />
      
      <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accoountsData?.slice(0, 2)}
      />
      </div>
    </>
  );
};

export default Home;
