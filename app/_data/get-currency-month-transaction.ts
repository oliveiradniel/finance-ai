import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { db } from "../_lib/prismaClient";

import { endOfMonth, startOfMonth } from "date-fns";

export async function getCurrenMonthTransactions() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
}
