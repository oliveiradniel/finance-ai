"use client";

import { useState } from "react";

import Markdown from "react-markdown";

import { createStripeCheckout } from "@/app/subscription/_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

import { generateAiReport } from "../_actions/generate-ai-report";

import { Loader2Icon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

export default function AiReportButton({
  hasPremiumPlan,
  month,
}: AiReportButtonProps) {
  const [report, setReport] = useState<string | null>();

  const [reportIsLoading, setReportIsLoading] = useState(false);

  async function handleGenerateReporClick() {
    try {
      setReportIsLoading(true);

      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (err) {
      console.log(err);
    } finally {
      setReportIsLoading(false);
    }
  }

  async function handlePlanAcquisiton() {
    const { sessionId } = await createStripeCheckout();

    const publicStripePublishableKey =
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publicStripePublishableKey) {
      throw new Error("Stripe publishable key not found");
    }

    const stripe = await loadStripe(publicStripePublishableKey);

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Relatório IA</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-[450px] text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReporClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatório com IA.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button onClick={handlePlanAcquisiton}>
                Assinar plano premium
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
