"use client"
import { Bar, BarChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import type {ChartConfig} from '@/components/ui/chart.tsx'
import {useEffect, useState} from "react"

declare global {
    interface Window {
        drdData: {
            rootUrl: string,
            nonce: string
        }
    }
}

export const description = "A stacked bar chart with a legend"
export const iframeHeight = "600px"
export const containerClassName =
    "[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh"

function Admin() {
    const [orders, setOrders] = useState<{total: string,  shipping_total: string, date_created: string}[]>([]);
    useEffect(() => {
        const getProducts = async (): Promise<void> => {
            const res = await fetch(`${window.drdData.rootUrl}wc/v3/orders`, {
                headers: {
                    'X-WP-Nonce': window.drdData.nonce,
                },
            });

            const data = await res.json();
            console.log(data);
            setOrders(data);
        };

        getProducts();
    }, []);

    const chartData = [

    ]

    for (let i = 0; i < orders.length; i++) {
        let element = orders[i];
        let object = { date: element.date_created, running: element.total, swimming: element.shipping_total }

        chartData.push(object);
    }

    const chartConfig = {
        running: {
            label: "Total ৳",
            color: "red",
        },
        swimming: {
            label: "Shipping ৳",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    return (
        <div className='w-2/4 mt-10'>
            <Card>
                <CardHeader>
                    <CardTitle>Tooltip - Line Indicator</CardTitle>
                    <CardDescription>Tooltip with line indicator.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    return new Date(value).toLocaleDateString("en-US", {
                                        weekday: "short",
                                    })
                                }}
                            />
                            <Bar
                                dataKey="running"
                                stackId="a"
                                fill="var(--color-running)"
                                radius={[0, 0, 4, 4]}
                            />
                            <Bar
                                dataKey="swimming"
                                stackId="a"
                                fill="var(--color-swimming)"
                                radius={[4, 4, 0, 0]}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent indicator="line" />}
                                cursor={false}
                                defaultIndex={1}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default Admin;
