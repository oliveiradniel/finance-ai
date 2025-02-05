"use client";

import { TransactionType } from "@prisma/client";

import { TransactionPercentagePerType } from "@/app/_data/_get-dashboard/types";

import { PiggyBank, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";

import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TansactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

export default function TransactionsPieChart({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TansactionsPieChartProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            value={typesPercentage[TransactionType.DEPOSIT]}
            title="Receita"
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-primary" />}
            value={typesPercentage[TransactionType.EXPENSE]}
            title="Despesa"
          />
          <PercentageItem
            icon={<PiggyBank size={16} className="text-primary" />}
            value={typesPercentage[TransactionType.INVESTMENT]}
            title="Investido"
          />
        </div>
      </CardContent>
    </Card>
  );
}
