import { useState, useEffect } from 'react';
import { TableManagerAccount } from '../../components/ui/table/index.js';
import userServices from '../../services/userService.js';
import authServices from '../../services/authService.js';
import useFetch from '../../hooks/useFetch.js';
import { handleDelete, handleIsActiveAccount, handleUpdateRoleAccount } from './handle.js';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext.jsx';
import roleServices from '../../services/roleService.js';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers.js';
import AppIcons from '../../components/ui/icon';

const managetAccountBreadCrumb = [
    {
      path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
      title: 'Dashboard',
      icon: <AppIcons.HomeIcon width='16' height='16' />
    },
    {
      title: 'Management account'
    }
  ];
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
    const { responsData: initialRoleData } = useFetch(roleServices.getAllRole);
    const [userData, setUserData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [changeRole,setChange] = useState({});
    const getUserData = async ()=>{
          const initialUserData = await userServices.getAllUser()
          setUserData(initialUserData);
    }
    useEffect(() => {
        if (initialRoleData) {
            setRoleData(initialRoleData)
        }
        getUserData();
    }, [initialRoleData,changeRole]);

    const optionsRole = roleData.map(role => ({
        value: role._id,
        title: role.role_Name
    }));
    
    return (
        <div>
            <TableManagerAccount
               roleBreadCrumbs={managetAccountBreadCrumb}
                roleData={optionsRole}
                data={userData}
                titleRow={titleRow}
                handleDelete={(id) => handleDelete(id, userData, setUserData, userServices.deleteUser, confirmDialog)}
                handleIsActiveAccount={(id) => handleIsActiveAccount(id, userServices.getAllUser, setUserData, authServices.handleIsActiveAccount)}
                handleUpdateRoleAccount={(idUser, idRole) => handleUpdateRoleAccount(idUser, idRole, roleServices.updateRoleUser,setChange)}
            />
        </div>
    );
};

export default ManagementUser;
