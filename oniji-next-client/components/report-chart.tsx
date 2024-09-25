"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart showing data points over time"

interface DataPoint {
  time: number;
  value: number;
}

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface ReportChartProps {
  points: number[];
}

export function ReportChart({ points }: ReportChartProps) {
  // Return nothing if points array is empty or has only one point
  if (points.length <= 1) {
    return null;
  }

  const chartData: DataPoint[] = points.map((value, index) => ({
    time: index * 5,
    value: Math.max(0, Math.min(1, value)),
  }));

  const duration = (points.length - 1) * 5;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">You Calm Level over Time</CardTitle>
        <CardDescription>{`Last ${minutes}m ${seconds}s`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
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
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none">
          your focus level has been increasing! <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
