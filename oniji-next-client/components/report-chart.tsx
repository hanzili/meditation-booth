"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DataPoint {
  time: number;
  value: number;
}

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ReportChartProps {
  points: number[];
}

export function ReportChart({ points }: ReportChartProps) {
  if (points.length <= 1) {
    return null;
  }

  const chartData: DataPoint[] = points.map((value, index) => ({
    time: index * 5,
    value: Math.max(0, Math.min(1, value)),
  }));

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: number) => `${value}`}
        />
        <YAxis
          domain={[0, 1]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.toFixed(1)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          className="stroke-primary"
          dataKey="value"
          type="natural"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
