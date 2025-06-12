declare global {
    interface Window {
        drdDara: {
            rootUrl: string,
            nonce: string
        }
    }
}

export type fetchSalseReportByUserRoleType = {
    message: string;
    data: {
        end_date: string,
        start_date: string,
        userRole: string,
        orders: {
            date: string,
            order_data: {
                net_sales: number,
                shipping_total: number
            }
        }[]
    }
}

export type parameterType = {
    userRole: string;
    referenceDate: string;
}

export const fetchSalseReportByUserRole = async (data: parameterType):Promise<fetchSalseReportByUserRoleType> => {
    const response = await fetch(`${window.drdData.rootUrl}drdcustomplugin/v1/salse-report-by-user-role`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.drdData.nonce
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error();
    }

    return await response.json()
}
