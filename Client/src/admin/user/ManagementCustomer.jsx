import { useState, useEffect } from 'react';
import { TableManagerAccount } from '../../components/ui/table/index.js';
import userServices from '../../services/userService.js';
import authServices from '../../services/authService.js';
import useFetch from '../../hooks/useFetch.js';
import { handleDelete, handleIsActiveAccount, handleUpdateRoleAccount } from './handle.js';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import roleServices from '../../services/roleService.js';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper.jsx';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb.jsx';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers.js';
import AppIcons from '../../components/ui/icon';

const managetCustomerBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Management customer'
  }
];

const ManagementCustomer = () => {
  const confirmDialog = useConfirmDialog();
  const titleRow = ['Full name', 'Email', 'Provider', 'Email verify', 'IsActive', 'Date created', 'Role', 'Action'];
  const { responsData: initialRoleData } = useFetch(roleServices.getAllRole);
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
    const [customerData, setCustomerData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [changeRole,setChange] = useState({});
    const getCustomerData = async ()=>{
          const initialUserData = await userServices.getAllCustomer()
          setCustomerData(initialUserData);
    }
    useEffect(() => {
        getCustomerData()
        if (initialRoleData) {
            setRoleData(initialRoleData)
        }
    }, [initialRoleData,changeRole]);
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
                handleUpdateRoleAccount={(idUser, idRole) => handleUpdateRoleAccount(idUser, idRole, roleServices.updateRoleUser,setChange)}
            />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ManagementCustomer;
