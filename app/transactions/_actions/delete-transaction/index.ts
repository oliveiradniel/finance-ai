"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prismaClient";

import { DeleteTransactionSchema } from "./schema";

export async function deleteTransaction({
  transactionId,
}: DeleteTransactionSchema) {
  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });
  revalidatePath("/transactions");
  revalidatePath("/");
}
