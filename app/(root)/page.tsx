import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = { firstName: "Yassine", lastName: "El-Brahmi", email: "yassineelbrahmi11@gmail.com" };
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
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={2047.5}
            />
          </header>
        </div>

         {/* <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        /> */}
      
      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 2047.5}, {currentBalance: 1234.5}]}
      /> 
      </div>
    </>
  );
};

export default Home;
