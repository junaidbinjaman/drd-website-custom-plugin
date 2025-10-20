
import { SalesReportContext } from "@/context/SalesReportDataContext/SalesReportDataContext";
import { useContext } from "react";

export default function useSalesReportDateData() {
    const context = useContext(SalesReportContext);

    if (!context) {
        throw new Error('Sales report must be used with a provider')
    }

    return context;
}