import { db } from "../_lib/prismaClient";

import { transactionColumns } from "./_columns";

import { DataTable } from "../_components/ui/data-table";
import { Button } from "../_components/ui/button";

export default async function Transaction() {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full font-bold">Adicionar transação</Button>
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
}
