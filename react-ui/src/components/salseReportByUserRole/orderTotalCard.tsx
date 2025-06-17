import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type OrderTotalCardProps = {
    data: {
        date: string;
        NetSalses: number;
        shipping: number;
    }[]
}

const OrderTotalCard = ({data}: OrderTotalCardProps) => {
    let netSalse: number = 0;
    let shipping: number = 0;

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        netSalse += element.NetSalses;
        shipping += element.shipping
    }

    return (
        <Card>
            <CardHeader className="border-b border-b-gray-200">
                <CardTitle>Order Total</CardTitle>
                <CardDescription>Net salse & shipping within the selected period.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-5'>
                <div className='bg-red-500 p-5 rounded-lg'>
                    <span className='text-sm italic text-gray-200'>Net Sales</span>
                    <span className='!text-2xl text-gray-200 font-bold block'>${netSalse.toLocaleString()}</span>
                </div>
                <div className='bg-green-500 p-5 rounded-lg'>
                    <span className='text-sm italic text-gray-200'>Total Shipping</span>
                    <span className='!text-2xl text-gray-200 font-bold block'>${shipping.toLocaleString()}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderTotalCard;
