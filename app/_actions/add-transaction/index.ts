"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prismaClient";

import { auth } from "@clerk/nextjs/server";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

type AddTransactionProps = Omit<
  Omit<Prisma.TransactionCreateInput, "userId">,
  "amount"
> & {
  amount: number;
};

export async function addTransaction(params: AddTransactionProps) {
  addTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.create({
    data: { ...params, userId },
  });

  revalidatePath("/transactions");
}
