import {Button} from '@/components/ui/button.tsx';
import useSalesReportDateData from '@/hooks/useSalesReportDateData';
import { endOfMonth, startOfMonth, subMonths, } from 'date-fns';

export default function LastMonthButton() {
    const {setStartDate, setEndDate, setDateType, dateType} = useSalesReportDateData();

    const clickHandler = () => {
        const lastMonth = subMonths(new Date(), 1);
        const firstDayOfMonth = startOfMonth(lastMonth);
        const lastDayOfMonth = endOfMonth(lastMonth);

        setStartDate(firstDayOfMonth);
        setEndDate(lastDayOfMonth);

        setDateType('lastMonth');
    };

    return (
        <>
            <Button variant={dateType === 'lastMonth' ? 'default' : 'outline'} onClick={clickHandler} className='cursor-pointer'>
                Last Month
            </Button>
        </>
    );
}
