import retailSalesReportFetcher, {
    type RetailSalesReportFetcherType,
} from '@/api/retailSalesReportFetcher';
import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {format} from 'date-fns';

export default function useGetRetailSalesReport(
    startDate: Date,
    endDate: Date,
): UseQueryResult<RetailSalesReportFetcherType> {
    const formattedStartDate = format(startDate, 'dd-MM-yyyy');
    const formattedEndDate = format(endDate, 'dd-MM-yyyy');

    return useQuery<RetailSalesReportFetcherType>({
        queryKey: ['retailSalesReport', formattedStartDate, formattedEndDate],
        queryFn: () =>
            retailSalesReportFetcher(formattedStartDate, formattedEndDate),
        enabled: !!formattedStartDate && !!formattedEndDate,
    });
}
