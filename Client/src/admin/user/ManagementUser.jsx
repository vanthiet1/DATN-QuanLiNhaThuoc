import { useState, useEffect } from 'react';
import { TableManagerAccount } from '../../components/ui/table/index.js';
import userServices from '../../services/userService.js';
import authServices from '../../services/authService.js';
import useFetch from '../../hooks/useFetch.js';
import { handleDelete , handleIsActiveAccount } from './handle.js';

const ManagementUser = () => {
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
    const { isLoading, isError, messsageError, responsData: initialUserData } = useFetch(userServices.getAllUser);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (initialUserData) {
            setUserData(initialUserData);
        }
    }, [initialUserData]);

    return (
        <div>
            <TableManagerAccount
                addClassNames={'w-[100%]'}
                data={userData}
                titleRow={titleRow}
                handleDelete={(id) => handleDelete(id, userData, setUserData, userServices.deleteUser)}
                handleIsActiveAccount={(id) => handleIsActiveAccount(id, userServices.getAllUser, setUserData, authServices.handleIsActiveAccount)}
            />
        </div>
    );
};

export default ManagementUser;
