import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {ReactNode} from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1
        }
    }
});

export const QueryClientContext = ({children}: { children: ReactNode }) => {
    return (<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
}
