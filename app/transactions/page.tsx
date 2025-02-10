import { db } from "../_lib/prismaClient";

import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { transactionColumns } from "./_columns";

import { DataTable } from "../_components/ui/data-table";

import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

export default async function Transaction() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  const userCanAddTransactions = await canUserAddTransaction();

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton
            userCanAddTransaction={userCanAddTransactions}
          />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
}
