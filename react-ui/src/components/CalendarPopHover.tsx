import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"
import {useEffect, useState} from "react";
import {useSalseStartDate} from "@/hooks/useSalseStartDate.ts";

function CalendarPopHover() {
    const [selected, setSelected] = useState<Date>();
    const {mutate} = useSalseStartDate();

    useEffect(() => {

        const payload = {
            date: selected
        }

        mutate(payload);

    }, [selected])

    return (
        <Popover>
            <PopoverTrigger className='rounded-lg sm:ml-auto sm:flex cursor-pointer'>Start Date</PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    className="rounded-lg border"
                />
            </PopoverContent>
        </Popover>
    )
}

export default CalendarPopHover;