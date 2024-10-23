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
  sessionLength: number;
}

export function ReportChart({ points, sessionLength }: ReportChartProps) {
  if (points.length <= 1) {
    return null;
  }

  const intervalInSeconds = sessionLength / (points.length - 1);

  const chartData: DataPoint[] = points.reduce((acc, value, index) => {
    const time = Number((index * intervalInSeconds).toFixed(3));
    if (value !== 0 || acc.length === 0) {
      acc.push({ time, value: Math.max(0, Math.min(0.4, value)) });
    } else {
      // Use the last non-zero point
      acc.push({ time, value: acc[acc.length - 1].value });
    }
    return acc;
  }, [] as DataPoint[]);

  const formatXAxis = (value: number) => {
    if (sessionLength <= 10) {
      return `${value.toFixed(2)}s`;
    } else if (sessionLength <= 60) {
      return `${value.toFixed(1)}s`;
    } else {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  const xAxisTicks = getXAxisTicks(sessionLength);

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
          tick={false}  // Remove x-axis labels
        />
        <YAxis
          domain={[0, 0.35]}
          tickLine={false}
          axisLine={false}
          tick={false}  // Remove y-axis labels
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

function getXAxisTicks(totalDuration: number): number[] {
  if (totalDuration <= 10) {
    return [0, totalDuration / 2, totalDuration];
  } else if (totalDuration <= 60) {
    const interval = Math.ceil(totalDuration / 5);
    return Array.from({ length: 6 }, (_, i) => i * interval);
  } else {
    const intervalMinutes = Math.ceil(totalDuration / 300) * 5;
    const numTicks = Math.floor(totalDuration / (intervalMinutes * 60)) + 1;
    return Array.from({ length: numTicks }, (_, i) => i * intervalMinutes * 60);
  }
}
