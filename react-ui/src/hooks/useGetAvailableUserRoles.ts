import {useQuery, type UseQueryResult} from "@tanstack/react-query";
import {fetchAvailableUserRoles, type fetchAvailableUserRolesType} from "@/api/fetchAvailableUserRoles.ts";


export const useGetAvailableUserRoles = (): UseQueryResult<
    fetchAvailableUserRolesType
> => {
    return useQuery({
        queryKey: ['availableUserRoles'],
        queryFn: fetchAvailableUserRoles
    })
}
