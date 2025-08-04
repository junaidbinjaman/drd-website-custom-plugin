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
}

export const salseStartDateApiFetch = async (data: {date: string, user_role: string}): Promise<salseStartDateType> => {
    const response = await fetch(`${window.drdData.rootUrl}drdcustomplugin/v1/salse-report-by-user-role`, {
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

    return await response.json();
}
