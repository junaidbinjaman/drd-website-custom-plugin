import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useGetAvailableUserRoles} from "@/hooks/useGetAvailableUserRoles.ts";

type UserRolesDropdownProps = {
    selectedUserRole: string;
    setSelectedUserRole: (value: string) => void;
}

const UserRolesDropdown = ({selectedUserRole, setSelectedUserRole}: UserRolesDropdownProps) => {
    const {data, isPending, isSuccess, isError} = useGetAvailableUserRoles();

    if (isPending) return 'Loading user roles..'
    if (isError) return 'Error';

    if (isSuccess)
        return (
            <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
                <SelectTrigger
                    className="w-[160px] rounded-lg sm:flex"
                    aria-label="Select a value"
                >
                    <SelectValue placeholder="Select user role"/>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                    {
                        Object.entries(data?.user_roles).map(([key, value]) => (
                            <SelectItem value={key} className="rounded-lg">
                                {value}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        )

}

export default UserRolesDropdown;