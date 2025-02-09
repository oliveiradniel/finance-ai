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

export default function AiReportButton() {
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
          <Button>Gerar relatório</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
