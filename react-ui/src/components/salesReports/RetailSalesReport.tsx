import useGetRetailSalesReport from '@/hooks/useGetRetailSalesReport';
import useSalesReportDateData from '@/hooks/useSalesReportDateData';
import {
    AcademicCapIcon,
    CurrencyDollarIcon,
    TagIcon,
    TruckIcon,
    ReceiptRefundIcon,
    ReceiptPercentIcon,
} from '@heroicons/react/24/outline';

const actions = [
    {
        title: 'Subtotal',
        href: '#',
        icon: CurrencyDollarIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
        description: 'Total sales amount before fees, discounts, or shipping.',

    },
    {
        title: 'Payment Processing Fees',
        href: '#',
        icon: ReceiptPercentIcon,
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
        description: 'Payment Processing fee or other service fees applied to all orders.',

    },
    {
        title: 'Shipping Total',
        href: '#',
        icon: TruckIcon,
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
        description: 'Total amount charged for product shipping.',
    },
    {
        title: 'Discount Total',
        href: '#',
        icon: TagIcon,
        iconForeground: 'text-yellow-700',
        iconBackground: 'bg-yellow-50',
        description: 'Overall value of discounts applied to orders.',
    },
    {
        title: 'Total Order',
        href: '#',
        icon: ReceiptRefundIcon,
        iconForeground: 'text-rose-700',
        iconBackground: 'bg-rose-50',
        description: 'Final total after all adjustments and charges.',
    },
    {
        title: 'Order Count',
        href: '#',
        icon: AcademicCapIcon,
        iconForeground: 'text-indigo-700',
        iconBackground: 'bg-indigo-50',
        description: 'Total order placed by retail users',
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function RetailSalesReport() {
    const {startDate, endDate} = useSalesReportDateData();
    const {isLoading, data} = useGetRetailSalesReport(
        startDate as Date,
        endDate as Date,
    );

    if (isLoading) {
        return <p>Loading..</p>;
    }

    return (
        <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow-sm sm:grid sm:grid-cols-2 sm:divide-y-0'>
            {actions.map((action, actionIdx) => (
                <div
                    key={action.title}
                    className={classNames(
                        actionIdx === 0
                            ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                            : '',
                        actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                        actionIdx === actions.length - 2
                            ? 'sm:rounded-bl-lg'
                            : '',
                        actionIdx === actions.length - 1
                            ? 'rounded-br-lg rounded-bl-lg sm:rounded-bl-none'
                            : '',
                        'group relative border-gray-200 bg-white p-6 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:odd:not-nth-last-2:border-b sm:even:border-l sm:even:not-last:border-b'
                    )}
                >
                    <div>
                        <span
                            className={classNames(
                                action.iconBackground,
                                action.iconForeground,
                                'inline-flex rounded-lg p-3'
                            )}
                        >
                            <action.icon
                                aria-hidden='true'
                                className='size-6'
                            />
                        </span>
                    </div>
                    <div className='mt-8'>
                        <h3 className='text-base font-semibold text-gray-900'>
                            <a
                                href={action.href}
                                className='focus:outline-hidden'
                            >
                                {/* Extend touch target to entire panel */}
                                <span
                                    aria-hidden='true'
                                    className='absolute inset-0'
                                />
                                {action.title}: &nbsp;
                                {action.title === 'Subtotal' && (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.data.subtotals
                                                    .formatted ?? '',
                                        }}
                                    />
                                )}
                                {action.title === 'Payment Processing Fees' && (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.data.fees.formatted ?? '',
                                        }}
                                    />
                                )}
                                {action.title === 'Shipping Total' && (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.data.shipping_totals
                                                    .formatted ?? '',
                                        }}
                                    />
                                )}
                                {action.title === 'Discount Total' && (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.data.discount_total
                                                    .formatted ?? '',
                                        }}
                                    />
                                )}
                                {action.title === 'Total Order' && (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                data?.data.order_totals
                                                    .formatted ?? '',
                                        }}
                                    />
                                )}
                                {action.title === 'Order Count' && (
                                    <span>{data?.total_orders}</span>
                                )}
                            </a>
                        </h3>
                        <p className='mt-2 text-sm text-gray-500'>
                            {action.description}
                        </p>
                    </div>
                    <span
                        aria-hidden='true'
                        className='pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400'
                    >
                        <svg
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='size-6'
                        >
                            <path d='M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z' />
                        </svg>
                    </span>
                </div>
            ))}
        </div>
    );
}
