import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {useState} from "react";

function CalendarPopHover () {
    const [selected, setSelected] = useState<Date>();

    function test() {
        console.log(selected?.toLocaleDateString('en-CA'))
    }

    test();

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

export  default CalendarPopHover;