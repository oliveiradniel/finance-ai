import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function AddTransactionButton() {
  return (
    <Button className="rounded-full font-bold">
      Adicionar transação
      <ArrowDownUpIcon />
    </Button>
  );
}
