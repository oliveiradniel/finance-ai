"use server";

import { db } from "@/app/_lib/prismaClient";

import { auth } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";

import { upsertTransactionSchema } from "./schema";

import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export async function upsertTransaction(params: UpsertTransactionParams) {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (params.id) {
    await db.transaction.update({
      where: {
        id: params.id,
      },
      data: { ...params, userId },
    });
    revalidatePath("/transactions");

    return;
  }

  await db.transaction.create({
    data: { ...params, userId },
  });
  revalidatePath("/transactions");
}
