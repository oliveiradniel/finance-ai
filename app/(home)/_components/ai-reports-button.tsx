"use client";

import { generateAiReport } from "../_actions/generate-ai-report";

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

interface AiReportButtonProps {
  month: string;
}

export default function AiReportButton({ month }: AiReportButtonProps) {
  async function handleGenerateReporClick() {
    try {
      await generateAiReport({ month });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Relatório IA</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar um relatório com insights
            sobre suas finanças.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerateReporClick}>Gerar relatório</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
