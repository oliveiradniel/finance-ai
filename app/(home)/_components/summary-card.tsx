import AddTransactionButton from "@/app/_components/add-transaction-button";

import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

export default function SummaryCard({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) {
  const formattedAmount = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return (
    <Card className={`${size === "large" && "bg-white bg-opacity-10"}`}>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl font-bold"}`}
        >
          {formattedAmount}
        </p>

        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
}
