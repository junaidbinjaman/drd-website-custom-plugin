import { createContext } from "react";

export type DateTypeTypes = 'yearToDate' | 'monthToDate' | 'lastMonth' | 'custom'

interface SalesReportContextDataTypes {
    startDate: Date | null;
    setStartDate: (date: Date) => void;
    endDate: Date | null;
    setEndDate: (date: Date) => void;
    dateType: DateTypeTypes | null;
    setDateType: (dateType: DateTypeTypes) => void;
}

export const SalesReportContext = createContext<SalesReportContextDataTypes | null>(null);