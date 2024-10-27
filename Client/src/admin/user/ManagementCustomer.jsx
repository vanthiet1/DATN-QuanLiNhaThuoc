import { useState, useEffect } from 'react';
import { TableManagerAccount } from '../../components/ui/table/index.js';
import userServices from '../../services/userService.js';
import authServices from '../../services/authService.js';
import useFetch from '../../hooks/useFetch.js';
import { handleDelete,handleIsActiveAccount , handleUpdateRoleAccount } from './handle.js';
import { useConfirmDialog } from "../../components/dialog/ConfirmDialogContext"; 
import roleServices from '../../services/roleService.js';
const ManagementCustomer = () => {
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
    
    const { isLoading, isError, messsageError, responsData: initialCustomerData } = useFetch(userServices.getAllCustomer);
    const { responsData: initialRoleData } = useFetch(roleServices.getAllRole);
    
    const [customerData, setCustomerData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    useEffect(() => {
        if (initialCustomerData && initialRoleData) {
            setCustomerData(initialCustomerData);
            setRoleData(initialRoleData)
        }
    }, [initialCustomerData]);
    const optionsRole = roleData.map(role => ({
        value: role._id,
        title: role.role_Name
      }));
    return (
        <div>
            <TableManagerAccount
                roleData={optionsRole}
                addClassNames={'w-[100%]'}
                data={customerData}
                titleRow={titleRow}
                handleDelete={(id) => handleDelete(id, customerData, setCustomerData, userServices.deleteUser ,  confirmDialog)}
                handleIsActiveAccount={(id) => handleIsActiveAccount(id, userServices.getAllStaff, setCustomerData, authServices.handleIsActiveAccount)}  
                handleUpdateRoleAccount={(idUser, idRole) => handleUpdateRoleAccount(idUser, idRole, roleServices.updateRoleUser)}
            />
        </div>
    );
};

export default ManagementCustomer;
