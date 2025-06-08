declare global {
    interface Window {
        drdData: {
            rootUrl: string;
            nonce: string;
        }
    }
}

export type fetchAvailableUserRolesType = {
    message: string,
    user_roles: Record<string, string>
}

export const fetchAvailableUserRoles = async ():Promise<fetchAvailableUserRolesType> => {
    const response = await fetch(`${window.drdData.rootUrl}drdcustomplugin/v1/user_roles`, {
        method: 'GET',
        headers: {
            'X-WP-Nonce': window.drdData.nonce
        }
    });

    if (!response.ok) {
        throw new Error();
    }

    return await response.json();
}