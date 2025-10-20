import {useState, type ReactNode} from 'react';
import {type DateTypeTypes, SalesReportContext} from '@/context/SalesReportDataContext/SalesReportDataContext';

export default function SalesReportDateProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [dateType, setDateType] = useState<DateTypeTypes | null>(null);

    return (
        <SalesReportContext.Provider
            value={{
                startDate: startDate,
                setStartDate: setStartDate,
                endDate: endDate,
                setEndDate: setEndDate,
                dateType: dateType,
                setDateType: setDateType,
            }}
        >
            {children}
        </SalesReportContext.Provider>
    );
}
