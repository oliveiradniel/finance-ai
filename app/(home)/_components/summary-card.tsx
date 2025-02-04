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
    <Card>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent>
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl font-bold"}`}
        >
          {formattedAmount}
        </p>
      </CardContent>
    </Card>
  );
}
