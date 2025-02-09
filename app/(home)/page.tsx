import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { isMatch } from "date-fns";

import getDashboard from "./_data/_get-dashboard";

import { canUserAddTransaction } from "../_data/can-user-add-transaction";

import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import AiReportButton from "./_components/ai-reports-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const { month } = await searchParams;

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);

  const userCanAddTransactions = await canUserAddTransaction();

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton month={month} />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-6">
          <div className="flex flex-col gap-6">
            <SummaryCards
              {...dashboard}
              userCanAddTransaction={userCanAddTransactions}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTrasactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
}
