import {useMutation, type UseMutationResult} from "@tanstack/react-query";
import {fetchSalseReportByUserRole, type fetchSalseReportByUserRoleType, type parameterType} from "@/api/fetchSalseReportByUserRole.ts";


export const useGetSalseReportByUserRole = (): UseMutationResult<fetchSalseReportByUserRoleType, Error, parameterType> => {
    return useMutation({
        mutationFn: fetchSalseReportByUserRole
    })
}
