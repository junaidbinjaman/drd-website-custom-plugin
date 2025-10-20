import wholesaleSalesReportFetcher, {
    type WholesaleSalesReportFetcherType,
} from '@/api/wholesaleSalesReportFetcher';
import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {format} from 'date-fns';

export default function useGetWholesaleSalesReport(
    startDate: Date,
    endDate: Date
): UseQueryResult<WholesaleSalesReportFetcherType> {
    const formattedStartDate = format(startDate, 'dd-MM-yyyy');
    const formattedEndDate = format(endDate, 'dd-MM-yyyy');

    return useQuery<WholesaleSalesReportFetcherType>({
        queryKey: ['wholesaleSalesReport', formattedStartDate, formattedEndDate],
        queryFn: () =>
            wholesaleSalesReportFetcher(formattedStartDate, formattedEndDate),
        enabled: !!formattedStartDate && !!formattedEndDate,
    });
}
