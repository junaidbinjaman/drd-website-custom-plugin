declare global {
    interface Window {
        drdData: {
            rootUrl: string;
            nonce: string;
        }
    }
}

export type salseStartDateType = {
    message: string;
    data: {
        date: string,
        order:
            {
                date: {
                    date: string,
                    "timezone_type": number | string,
                    "timezone": string
                },
                total: {
                    order_total: number | string,
                    shipping_total: number | string,
                    tax_total: number | string,
                    formatted_order_total: string,
                    formatted_shipping_total: string,
                    formatted_tax_total: string
                }
            }[],
    }
}

export const salseStartDateApiFetch = async (data: {
    date: string,
    user_role: string
}): Promise<salseStartDateType> => {
    const response = await fetch(`http://localhost:10028/wp-json/drdcustomplugin/v1/salse-report-by-user-role`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.drdData.nonce
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    console.log(window.drdData.rootUrl, window.drdData.nonce)
    return await response.json();
}
