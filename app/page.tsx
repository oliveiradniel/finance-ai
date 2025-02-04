import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

import NavBar from "./_components/navbar";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <div className="flex h-full items-center justify-center">
        <UserButton showName />
      </div>
    </>
  );
}
