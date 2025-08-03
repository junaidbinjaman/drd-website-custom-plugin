import {useMutation, type UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {salseStartDateApiFetch, type salseStartDateType} from "@/api/salseStartDateApiFetch.ts";

export const useSalseStartDate = (): UseMutationResult<
    salseStartDateType,
    Error,
    {
        date: Date | undefined
    }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: salseStartDateApiFetch,
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({queryKey: ['salseReportByUserRole']})
            console.log({data: data, variables: variables, context: context})
        }
    })
}
