import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const CreateReportPopup = () => {
    return (
        <Dialog>
            <DialogTrigger className='rounded-lg py-2 w-[160px] flex justify-left pl-3  border cursor-pointer'>Create Report</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Under development</DialogTitle>
                    <DialogDescription>
                       The report creation function is coming back soon. Till then, keep enjoying..
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateReportPopup;