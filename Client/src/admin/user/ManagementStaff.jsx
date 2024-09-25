import { TableManagerAccount } from '../../components/ui/table/index.js'
import useFetch from '../../hooks/useFetch.js';
import staffServices from '../../services/staffService.js';
const ManagementStaff = () => {
    const titleRow = [
        "Full name",
        "Email",
        "Provider",
        "Status",
        "Date created",
        "Role",
        "Action"
    ]
  
    const { isLoading, isError, responsData: staffData, messsageError } = useFetch(staffServices.getAllStaff);
    console.log(staffData);
    return (
        <div>
            <TableManagerAccount
                addClassNames={'w-[100%]'}
                data={staffData}
                titleRow={titleRow}
            />
        </div>
    );
};

export default ManagementStaff;