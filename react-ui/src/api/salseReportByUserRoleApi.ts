declare global {
    interface Window {
        drdData: {
            rootUrl: string,
            nonce: string,
        }
    }
}

type salseReportByUserRoleApiType = {
    message: string;
    data: {
        date: {
            date: string;
            timezone: string;
            timezone_type: number;
        },
        total: {
            order_total: string;
            shipping_total: string;
            tax_total: string;
        }
    }[]
}

export const fetchSalseReportByUserRoleApi = async (): Promise<salseReportByUserRoleApiType> => {
    const response = await fetch(`${window.drdData.rootUrl}drdcustomplugin/v1/salse-report-by-user-role`, {
        method: 'GET',
        headers: {
            'X-WP-Nonce': window.drdData.nonce
        }
    });

    return response.json();
}