import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <SummaryCards />
    </>
  );
}
