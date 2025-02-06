interface PercentageItemProps {
  icon: React.ReactNode;
  value: number;
  title: string;
}

export default function PercentageItem({
  icon,
  value,
  title,
}: PercentageItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-white bg-opacity-[3%] p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
}
