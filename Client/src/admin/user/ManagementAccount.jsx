import { useState, useEffect } from 'react';
import { TableManagerAccount } from '../../components/ui/table/index.js';
import userServices from '../../services/userService.js';
import authServices from '../../services/authService.js';
import useFetch from '../../hooks/useFetch.js';
import { handleDelete, handleIsActiveAccount, handleUpdateRoleAccount } from './handle.js';
import { useConfirmDialog } from "../../components/dialog/ConfirmDialogContext.jsx";
import roleServices from '../../services/roleService.js';

const ManagementUser = () => {
    const confirmDialog = useConfirmDialog();
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
    const { responsData: initialUserData } = useFetch(userServices.getAllUser);
    const { responsData: initialRoleData } = useFetch(roleServices.getAllRole);
    const [userData, setUserData] = useState([]);
    const [roleData, setRoleData] = useState([]);

    useEffect(() => {
        if (initialUserData && initialRoleData) {
            setUserData(initialUserData);
            setRoleData(initialRoleData)
        }
    }, [initialUserData, initialRoleData]);

    const optionsRole = roleData.map(role => ({
        value: role._id,
        title: role.role_Name
    }));
    return (
        <div>
            <TableManagerAccount
                addClassNames={''}
                roleData={optionsRole}
                data={userData}
                titleRow={titleRow}
                handleDelete={(id) => handleDelete(id, userData, setUserData, userServices.deleteUser, confirmDialog)}
                handleIsActiveAccount={(id) => handleIsActiveAccount(id, userServices.getAllUser, setUserData, authServices.handleIsActiveAccount)}
                handleUpdateRoleAccount={(idUser, idRole) => handleUpdateRoleAccount(idUser, idRole, roleServices.updateRoleUser)}
            />
        </div>
    );
};

export default ManagementUser;
