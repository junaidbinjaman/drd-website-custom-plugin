import RetailSalesReport from '@/components/salesReports/RetailSalesReport.tsx';
import {ButtonGroup} from '@/components/ui/button-group.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useEffect, useState} from 'react';
import WholesaleSalesReport from '@/components/salesReports/WholesaleSalesReport.tsx';
import {DateRangePicker} from '@/components/salesReports/DateRangePicker.tsx';
import LastMonthButton from './components/salesReports/LastMonthButton';
import YearToDateButton from './components/salesReports/YearToDateButton';
import MonthToDate from './components/salesReports/MonthToDate';
import useSalesReportDateData from './hooks/useSalesReportDateData';
import {format, startOfMonth} from 'date-fns';
import {ChartAreaIcon} from 'lucide-react';

export default function Admin() {
    const [selectedUserRole, setSelectedUserRole] = useState('retail');
    const {
        setStartDate,
        startDate,
        setEndDate,
        endDate,
        setDateType,
    } = useSalesReportDateData();

    useEffect(() => {
        setStartDate(startOfMonth(new Date()));
        setEndDate(new Date());
        setDateType('monthToDate');
    }, []);


    return (
        <div className='overflow-hidden rounded-lg bg-white shadow-sm mr-5 mt-5'>
            <div className='px-4 py-5 sm:px-6 flex items-center gap-5'>
                <div className='border-r-2 w-fit pr-10'>
                    <p>Select User Role</p>
                    <ButtonGroup>
                        <Button
                            variant={
                                selectedUserRole === 'retail'
                                    ? 'default'
                                    : 'outline'
                            }
                            className='cursor-pointer'
                            onClick={() => setSelectedUserRole('retail')}
                        >
                            Retail Customer
                        </Button>
                        <Button
                            variant={
                                selectedUserRole === 'wholesale'
                                    ? 'default'
                                    : 'outline'
                            }
                            className='cursor-pointer'
                            onClick={() => setSelectedUserRole('wholesale')}
                        >
                            Wholesale Customer
                        </Button>
                    </ButtonGroup>
                </div>
                <div>
                    <p>Select a date range to see the results</p>
                    <div className='flex items-center justify-center gap-5'>
                        <MonthToDate />
                        <LastMonthButton />
                        <YearToDateButton />
                        <DateRangePicker />
                    </div>
                </div>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:p-6'>
                <p className='flex items-center text-gray-400 gap-2'>
                    <ChartAreaIcon />
                    Showing results for {startDate && format(startDate, 'MM/dd/yyyy')} - {endDate && format(endDate, 'MM/dd/yyyy')}
                </p>
                {selectedUserRole === 'retail' ? (
                    <RetailSalesReport />
                ) : (
                    <WholesaleSalesReport />
                )}
            </div>
        </div>
    );
}
