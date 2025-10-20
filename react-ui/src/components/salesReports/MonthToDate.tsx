import {startOfMonth} from 'date-fns';
import {Button} from '../ui/button';
import useSalesReportDateData from '@/hooks/useSalesReportDateData';

function MonthToDate() {
    const {setStartDate, setEndDate, setDateType, dateType} = useSalesReportDateData();

    const clickHandler = () => {
        const startOfTheMonth = startOfMonth(new Date());
        const todaysDate = new Date();

        setStartDate(startOfTheMonth);
        setEndDate(todaysDate);
        setDateType('monthToDate')
    };
    return (
        <Button
            variant={dateType === 'monthToDate' ? 'default' : 'outline'}
            className='cursor-pointer'
            onClick={clickHandler}
        >
            Month to Date
        </Button>
    );
}

export default MonthToDate;
