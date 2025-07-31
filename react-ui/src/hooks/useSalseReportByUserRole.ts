import {useQuery} from "@tanstack/react-query";
import {fetchSalseReportByUserRoleApi} from "@/api/salseReportByUserRoleApi.ts";

export const useSalseReportByUserRole = () => {
    return useQuery({
        queryKey: ['salseReportByUserRole'],
        queryFn: fetchSalseReportByUserRoleApi,
        refetchOnWindowFocus: false
    });
}
