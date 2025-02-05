import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { isMatch } from "date-fns";

import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";

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

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <SummaryCards month={month} />
        </div>
      </div>
    </>
  );
}
