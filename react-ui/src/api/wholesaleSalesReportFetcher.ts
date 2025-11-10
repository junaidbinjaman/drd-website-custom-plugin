declare global {
    interface Window {
        drdData: {
            rootUrl: string;
            nonce: string;
        };
    }
}

type DataType = {
    subtotals: {
        raw: number;
        formatted: string;
    };
    fees: {
        raw: number;
        formatted: string;
    };
    shipping_totals: {
        raw: number;
        formatted: string;
    };
    discount_total: {
        raw: number;
        formatted: string;
    };
    order_totals: {
        raw: number;
        formatted: string;
    };
};

export type WholesaleSalesReportFetcherType = {
    status: 'success' | 'fail';
    message: string;
    'start-date': string;
    'end-date': string;
    total_orders: number;
    data: DataType;
};

async function wholesaleSalesReportFetcher(
    startDate: string,
    endDate: string
): Promise<WholesaleSalesReportFetcherType> {
    const url = `${window.drdData.rootUrl}drdcustomplugin/v1/wholesale-sales-report?start_date=${startDate}&end_date=${endDate}`;
    const response = await fetch(url, {
        headers: {
            'X-WP-Nonce': window.drdData.nonce,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch retail sales report');
    }

    const data = await response.json();
    return data;
}

export default wholesaleSalesReportFetcher;
