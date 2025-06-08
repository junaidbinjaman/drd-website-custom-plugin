import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"

type CalendarPopHoverProps = {
    referenceDate: Date | undefined;
    setReferenceDate: (value: Date | undefined) => void
}

function CalendarPopHover({referenceDate, setReferenceDate}: CalendarPopHoverProps) {
    return (
        <Popover>
            <PopoverTrigger className='rounded-lg py-2 w-[160px] flex justify-left pl-3  border cursor-pointer'>
                {referenceDate ? referenceDate.toLocaleDateString() : 'Select Date'}
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={referenceDate}
                    onSelect={setReferenceDate}
                    className="rounded-lg border"
                />
            </PopoverContent>
        </Popover>
    )
}

export default CalendarPopHover;