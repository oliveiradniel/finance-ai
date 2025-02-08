import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrenMonthTransactions } from "./get-currency-month-transaction";
import { redirect } from "next/navigation";

export async function canUserAddTransaction() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = (await clerkClient()).users.getUser(userId);
  if ((await user).publicMetadata.subscriptionPlan === "premium") {
    return true;
  }

  const currentMonthTransactions = await getCurrenMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }

  return true;
}
