import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"
import {useState} from "react";
// import {useSalseStartDate} from "@/hooks/useSalseStartDate.ts";

function CalendarPopHover() {
    const [selected, setSelected] = useState<Date>();
    // const {mutate} = useSalseStartDate();

    // useEffect(() => {
    //
    //     const payload = {
    //         date: selected
    //     }
    //
    //     mutate(payload);
    //
    // }, [selected])

    console.log(selected?.toLocaleDateString())

    return (
        <Popover>
            <PopoverTrigger className='rounded-lg py-2 w-[160px] flex justify-left pl-3  border cursor-pointer'>
                {selected ? selected.toLocaleDateString() : 'Select Date'}
            </PopoverTrigger>
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