import { useState, useEffect } from 'react';
import { TableManagerAccount } from '../../components/ui/table/index.js';
import staffServices from '../../services/staffService.js';
import authServices from '../../services/authService.js';
import useFetch from '../../hooks/useFetch.js';
import { handleDelete,handleIsActiveAccount } from './handle.js';

const ManagementStaff = () => {
    const titleRow = [
        "Full name",
        "Email",
        "Provider",
        "Status",
        "IsActive",
        "Date created",
        "Role",
        "Action"
    ];

    const { isLoading, isError, messsageError, responsData: initialStaffData } = useFetch(staffServices.getAllStaff);
    const [staffData, setStaffData] = useState([]);

    useEffect(() => {
        if (initialStaffData) {
            setStaffData(initialStaffData);
        }
    }, [initialStaffData]);

    return (
        <div>
            <TableManagerAccount
                addClassNames={'w-[100%]'}
                data={staffData}
                titleRow={titleRow}
                handleDelete={(id) => handleDelete(id, staffData, setStaffData, staffServices.deleteStaff)}
                handleIsActiveAccount={(id) => handleIsActiveAccount(id, staffServices.getAllStaff, setStaffData, authServices.handleIsActiveAccount)}
            />
        </div>
    );
};

export default ManagementStaff;
