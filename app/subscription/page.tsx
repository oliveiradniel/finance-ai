import { redirect } from "next/navigation";

import { auth, clerkClient } from "@clerk/nextjs/server";

import { getCurrenMonthTransactions } from "../_data/get-currency-month-transaction";

import { CheckIcon, XIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "../_components/ui/card";

import NavBar from "../_components/navbar";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";

export default async function Subscription() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await (await clerkClient()).users.getUser(userId);

  const currentMonthTransactions = await getCurrenMonthTransactions();

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>

        <div className="flex gap-6">
          <Card className="relative w-[450px]">
            {!hasPremiumPlan && (
              <Badge className="absolute left-4 top-12 bg-primary/10 text-primary hover:bg-primary/10">
                Ativo
              </Badge>
            )}
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <div className="text-2xl text-muted-foreground">mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />

                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary hover:bg-primary/10">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19,00</span>
                <div className="text-2xl text-muted-foreground">mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon />
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
