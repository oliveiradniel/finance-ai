"use client";

import { useState } from "react";

import Markdown from "react-markdown";

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
  month: string;
}

export default function AiReportButton({ month }: AiReportButtonProps) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Relatório IA</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
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
          <Button onClick={handleGenerateReporClick} disabled={reportIsLoading}>
            {reportIsLoading && <Loader2Icon className="animate-spin" />}
            Gerar relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
