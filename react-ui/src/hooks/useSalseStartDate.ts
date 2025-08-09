import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {salseStartDateApiFetch, type salseStartDateType} from "@/api/salseStartDateApiFetch.ts";

export const useSalseStartDate = (): UseMutationResult<
    salseStartDateType,
    Error,
    {
        date: string,
        user_role: string
    }
> => {

    return useMutation({
        mutationFn: salseStartDateApiFetch,
        onSuccess: async (data, variables, context) => {
            console.log(data, variables, context);
        }
    })
}
