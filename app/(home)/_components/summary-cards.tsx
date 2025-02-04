import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

export default function SummaryCards() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center gap-2">
          <WalletIcon size={16} />
          <p className="text-white opacity-70">Saldo</p>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">R$2.000</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <PiggyBankIcon size={14} />
            <p className="text-muted-foreground opacity-70">Investido</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$3.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <TrendingUpIcon size={14} />
            <p className="text-muted-foreground opacity-70">Receita</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$3.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <TrendingDownIcon size={14} />
            <p className="text-muted-foreground opacity-70">Despesas</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$3.000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
