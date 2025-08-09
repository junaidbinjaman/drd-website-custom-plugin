"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
import CalendarPopHover from "@/components/CalendarPopHover.tsx";
import CreateReportPopup from "@/components/salseReportByUserRole/createReportPopup.tsx";

export const description = "An interactive area chart"

const chartData = [
    { date: "2024-04-01", NetSalses: 222, shipping: 150 },
    { date: "2024-04-02", NetSalses: 97, shipping: 180 },
    { date: "2024-04-03", NetSalses: 167, shipping: 120 },
    { date: "2024-04-04", NetSalses: 242, shipping: 260 },
    { date: "2024-04-05", NetSalses: 373, shipping: 290 },
    { date: "2024-04-06", NetSalses: 301, shipping: 340 },
    { date: "2024-04-07", NetSalses: 245, shipping: 180 },
    { date: "2024-04-08", NetSalses: 409, shipping: 320 },
    { date: "2024-04-09", NetSalses: 59, shipping: 110 },
    { date: "2024-04-10", NetSalses: 261, shipping: 190 },
    { date: "2024-04-11", NetSalses: 327, shipping: 350 },
    { date: "2024-04-12", NetSalses: 292, shipping: 210 },
    { date: "2024-04-13", NetSalses: 342, shipping: 380 },
    { date: "2024-04-14", NetSalses: 137, shipping: 220 },
    { date: "2024-04-15", NetSalses: 120, shipping: 170 },
    { date: "2024-04-16", NetSalses: 138, shipping: 190 },
    { date: "2024-04-17", NetSalses: 446, shipping: 360 },
    { date: "2024-04-18", NetSalses: 364, shipping: 410 },
    { date: "2024-04-19", NetSalses: 243, shipping: 180 },
    { date: "2024-04-20", NetSalses: 89, shipping: 150 },
    { date: "2024-04-21", NetSalses: 137, shipping: 200 },
    { date: "2024-04-22", NetSalses: 224, shipping: 170 },
    { date: "2024-04-23", NetSalses: 138, shipping: 230 },
    { date: "2024-04-24", NetSalses: 387, shipping: 290 },
    { date: "2024-04-25", NetSalses: 215, shipping: 250 },
    { date: "2024-04-26", NetSalses: 75, shipping: 130 },
    { date: "2024-04-27", NetSalses: 383, shipping: 420 },
    { date: "2024-04-28", NetSalses: 122, shipping: 180 },
    { date: "2024-04-29", NetSalses: 315, shipping: 240 },
    { date: "2024-04-30", NetSalses: 454, shipping: 380 },
    { date: "2024-05-01", NetSalses: 165, shipping: 220 },
    { date: "2024-05-02", NetSalses: 293, shipping: 310 },
    { date: "2024-05-03", NetSalses: 247, shipping: 190 },
    { date: "2024-05-04", NetSalses: 385, shipping: 420 },
    { date: "2024-05-05", NetSalses: 481, shipping: 390 },
    { date: "2024-05-06", NetSalses: 498, shipping: 520 },
    { date: "2024-05-07", NetSalses: 388, shipping: 300 },
    { date: "2024-05-08", NetSalses: 149, shipping: 210 },
    { date: "2024-05-09", NetSalses: 227, shipping: 180 },
    { date: "2024-05-10", NetSalses: 293, shipping: 330 },
    { date: "2024-05-11", NetSalses: 335, shipping: 270 },
    { date: "2024-05-12", NetSalses: 197, shipping: 240 },
    { date: "2024-05-13", NetSalses: 197, shipping: 160 },
    { date: "2024-05-14", NetSalses: 448, shipping: 490 },
    { date: "2024-05-15", NetSalses: 473, shipping: 380 },
    { date: "2024-05-16", NetSalses: 338, shipping: 400 },
    { date: "2024-05-17", NetSalses: 499, shipping: 420 },
    { date: "2024-05-18", NetSalses: 315, shipping: 350 },
    { date: "2024-05-19", NetSalses: 235, shipping: 180 },
    { date: "2024-05-20", NetSalses: 177, shipping: 230 },
    { date: "2024-05-21", NetSalses: 82, shipping: 140 },
    { date: "2024-05-22", NetSalses: 81, shipping: 120 },
    { date: "2024-05-23", NetSalses: 252, shipping: 290 },
    { date: "2024-05-24", NetSalses: 294, shipping: 220 },
    { date: "2024-05-25", NetSalses: 201, shipping: 250 },
    { date: "2024-05-26", NetSalses: 213, shipping: 170 },
    { date: "2024-05-27", NetSalses: 420, shipping: 460 },
    { date: "2024-05-28", NetSalses: 233, shipping: 190 },
    { date: "2024-05-29", NetSalses: 78, shipping: 130 },
    { date: "2024-05-30", NetSalses: 340, shipping: 280 },
    { date: "2024-05-31", NetSalses: 178, shipping: 230 },
    { date: "2024-06-01", NetSalses: 178, shipping: 200 },
    { date: "2024-06-02", NetSalses: 470, shipping: 410 },
    { date: "2024-06-03", NetSalses: 103, shipping: 160 },
    { date: "2024-06-04", NetSalses: 439, shipping: 380 },
    { date: "2024-06-05", NetSalses: 88, shipping: 140 },
    { date: "2024-06-06", NetSalses: 294, shipping: 250 },
    { date: "2024-06-07", NetSalses: 323, shipping: 370 },
    { date: "2024-06-08", NetSalses: 385, shipping: 320 },
    { date: "2024-06-09", NetSalses: 438, shipping: 480 },
    { date: "2024-06-10", NetSalses: 155, shipping: 200 },
    { date: "2024-06-11", NetSalses: 92, shipping: 150 },
    { date: "2024-06-12", NetSalses: 492, shipping: 420 },
    { date: "2024-06-13", NetSalses: 81, shipping: 130 },
    { date: "2024-06-14", NetSalses: 426, shipping: 380 },
    { date: "2024-06-15", NetSalses: 307, shipping: 350 },
    { date: "2024-06-16", NetSalses: 371, shipping: 310 },
    { date: "2024-06-17", NetSalses: 475, shipping: 520 },
    { date: "2024-06-18", NetSalses: 107, shipping: 170 },
    { date: "2024-06-19", NetSalses: 341, shipping: 290 },
    { date: "2024-06-20", NetSalses: 408, shipping: 450 },
    { date: "2024-06-21", NetSalses: 169, shipping: 210 },
    { date: "2024-06-22", NetSalses: 317, shipping: 270 },
    { date: "2024-06-23", NetSalses: 480, shipping: 530 },
    { date: "2024-06-24", NetSalses: 132, shipping: 180 },
    { date: "2024-06-25", NetSalses: 141, shipping: 190 },
    { date: "2024-06-26", NetSalses: 434, shipping: 380 },
    { date: "2024-06-27", NetSalses: 448, shipping: 490 },
    { date: "2024-06-28", NetSalses: 149, shipping: 200 },
    { date: "2024-06-29", NetSalses: 103, shipping: 160 },
    { date: "2024-06-30", NetSalses: 446, shipping: 400 },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    NetSalses: {
        label: "Net Salse",
        color: "var(--chart-1)",
    },
    shipping: {
        label: "Shipping",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ReportChart() {
    const [timeRange, setTimeRange] = React.useState("30d")
    const [selectedUserRole, setSelectedUserRole] = useState('customer');

    console.log(selectedUserRole);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
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
            <CardHeader className="flex items-justified-left gap-2 space-y-0 border-b py-5 sm:flex-row">
                <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="customer" className="rounded-lg">
                            Customer
                        </SelectItem>
                        <SelectItem value="wholesale_customer" className="rounded-lg">
                            Wholesale customer
                        </SelectItem>
                        <SelectItem value="subscriber" className="rounded-lg">
                            Subscriber
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:flex"
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
                <CalendarPopHover />
                <CreateReportPopup />
            </CardHeader>
            <CardContent>
                <div className="grid flex-1 gap-1">
                    <CardTitle>Salse Report by User Role</CardTitle>
                    <CardDescription>
                        Showing total revenue earned by the selected user role
                    </CardDescription>
                </div>
            </CardContent>
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
                                    stopColor="var(--color-NetSalses)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-NetSalses)"
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
                            dataKey="NetSalses"
                            type="natural"
                            fill="url(#fillNetSalses)"
                            stroke="var(--color-NetSalses)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
