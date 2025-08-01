"use client"

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {useSalseReportByUserRole} from "@/hooks/useSalseReportByUserRole.ts";
import CalendarPopHover from "@/components/CalendarPopHover.tsx";

const chartConfig = {
    visitors: {
        label: "Revenue",
    },
    net_salses: {
        label: "Net Salse $",
        color: "var(--chart-4)",
    },
    shipping: {
        label: "Shipping $",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export default function SalseByUserRoleChart() {
    const [timeRange, setTimeRange] = React.useState("30d")
    const {data, isPending, isError, error} = useSalseReportByUserRole();

    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const chartData: {
        date: string // "2024-04-30",
        net_salses: number // 454,
        shipping: number // 380
    }[] = [];

    for (let i = 0; i < data?.data.length; i++) {
        let element = data?.data[i];

        let date = element?.date.date.split(" ")[0];
        let net_salses = Number(element?.total.order_total);
        let shipping = Number(element?.total.shipping_total);

        chartData.push({date, net_salses, shipping});
    }

    console.log(chartData);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date()
        let daysToSubtract = 30

        if (timeRange === "15d") {
            daysToSubtract = 15
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }

        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Net Sales and Shipping Revenue</CardTitle>
                    <CardDescription>
                        Showing total net revenue for the selected date range.
                    </CardDescription>
                </div>
                <CalendarPopHover />
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 30 days" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="15d" className="rounded-lg">
                            Last 15 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillNetSalses" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-net_salses)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-net_salses)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillShipping" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-shipping)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-shipping)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="shipping"
                            type="natural"
                            fill="url(#fillShipping)"
                            stroke="var(--color-shipping)"
                            stackId="a"
                        />
                        <Area
                            dataKey="net_salses"
                            type="natural"
                            fill="url(#fillNetSalses)"
                            stroke="var(--color-net_salses)"
                            stackId="a"
                        />

                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
