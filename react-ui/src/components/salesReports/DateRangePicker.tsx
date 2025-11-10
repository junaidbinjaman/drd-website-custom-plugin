'use client';

import * as React from 'react';
import {Calendar as CalendarIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import type {DateRange} from 'react-day-picker';
import {format} from 'date-fns';
import useSalesReportDateData from '@/hooks/useSalesReportDateData';

export function DateRangePicker() {
    const [date, setDate] = React.useState<DateRange>();
    const [open, setOpen] = React.useState(false);

    const {setStartDate, setEndDate, setDateType, dateType} =
        useSalesReportDateData();

    const handleClick = () => {
        if (date?.from && date?.to) {
            setStartDate(date.from);
            setEndDate(date.to);
            setDateType('custom');
        }

        setOpen(false);
    };
    return (
        <Popover open={open} onOpenChange={() => setOpen(!open)}>
            <PopoverTrigger asChild>
                <Button
                    variant={dateType === 'custom' ? 'default' : 'outline'}
                    data-empty={!date}
                    className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal cursor-pointer'
                >
                    <CalendarIcon />
                    {date?.from && date?.to
                        ? `${format(date?.from, 'MM/dd/yyy')} - ${format(
                              date?.to,
                              'MM/dd/yyy'
                          )}`
                        : 'Select date range'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0 flex justify-end flex-col'>
                <Calendar disabled={{after: new Date() }} mode='range' selected={date} onSelect={setDate}/>
                <div className='flex justify-end'>
                    <Button
                        onClick={() => setOpen(false)}
                        variant='ghost'
                        className='mr-2 cursor-pointer'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleClick}
                        className='mr-2 mb-2 cursor-pointer'
                        variant='ghost'
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
