import { Button } from "../ui/button";
import { startOfYear } from "date-fns";
import useSalesReportDateData from "@/hooks/useSalesReportDateData";

export default function YearToDateButton() {
    const {setStartDate, setEndDate, setDateType, dateType} = useSalesReportDateData();

    const clickHandler = () => {
        const startOfTheYear = startOfYear(new Date());
        const todaysDate = new Date();

        setStartDate(startOfTheYear);
        setEndDate(todaysDate);
        setDateType('yearToDate')
    }

    return (
        <Button 
        variant={dateType === 'yearToDate' ? 'default' : 'outline'} 
        onClick={clickHandler}
        className="cursor-pointer"
        >
            Year to Date
            </Button>
    )
}