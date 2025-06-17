"use client"

import * as React from "react"
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"

type ChartDataType = {
    date: string,
    NetSalses: number,
    shipping: number
}[]

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
import {useEffect, useState} from "react";
import CalendarPopHover from "@/components/CalendarPopHover.tsx";
import CreateReportPopup from "@/components/salseReportByUserRole/createReportPopup.tsx";
import UserRolesDropdown from "@/components/salseReportByUserRole/userRolesDropdown.tsx";
import {useGetSalseReportByUserRole} from "@/hooks/useGetSalseReportByUserRole.ts";
import OrderTotalCard from "@/components/salseReportByUserRole/orderTotalCard.tsx";

export const description = "An interactive area chart"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    NetSalses: {
        label: "Net Salse $",
        color: "var(--chart-1)",
    },
    shipping: {
        label: "Shipping $",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ReportChart() {
    const [timeRange, setTimeRange] = React.useState("30d")
    const [selectedUserRole, setSelectedUserRole] = useState('customer');
    const [referenceDate, setReferenceDate] = useState<Date | undefined>(new Date());

    const {mutate, data, isPending, isError, error, isSuccess} = useGetSalseReportByUserRole();

    const chartData: ChartDataType = [];

    useEffect(() => {
        if (!referenceDate) {
            console.log("No reference date yet");
            return;
        }

        const date = referenceDate.toLocaleDateString('en-CA');
        console.log(date);

        mutate({userRole: selectedUserRole, referenceDate: date});
    }, [referenceDate, selectedUserRole, mutate]);

    if (isSuccess) {
        for (let i = 0; i < data!.data.orders.length; i++) {
            const element = data!.data.orders[i];
            chartData.push({
                date: element.date,
                NetSalses: element.order_data.net_sales,
                shipping: element.order_data.shipping_total
            })
        }
    }

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);

        // Use the state variable here
        const refDate = referenceDate ? new Date(referenceDate) : new Date();

        let daysToSubtract = 30;
        if (timeRange === "15d") {
            daysToSubtract = 15;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }

        const startDate = new Date(refDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);

        return date >= startDate;
    });

    if (isPending) return 'Loading data..';
    if (isError) return 'Something went wrong.' + error;

    return (
        <div className='flex mt-10 gap-5 px-5'>
            <div className='flex-3'>
                <Card className="pt-0">
                    <CardHeader className="flex items-justified-left gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <UserRolesDropdown
                            selectedUserRole={selectedUserRole}
                            setSelectedUserRole={setSelectedUserRole}
                        />
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger
                                className="w-[160px] rounded-lg sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 30 days"/>
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
                        <CalendarPopHover
                            referenceDate={referenceDate}
                            setReferenceDate={setReferenceDate}
                        />
                        <CreateReportPopup/>
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
                                <CartesianGrid vertical={false}/>
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
                                <ChartLegend content={<ChartLegendContent/>}/>
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <div className='flex-1'>
                <OrderTotalCard data={filteredData}/>
            </div>
        </div>
    )
}
