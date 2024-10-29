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

const managementStaffBreadcrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Management customer'
  }
];

const ManagementStaff = () => {
  const confirmDialog = useConfirmDialog();

  const titleRow = ['Full name', 'Email', 'Provider', 'Email verify', 'IsActive', 'Date created', 'Role', 'Action'];

  const { isLoading, isError, messsageError, responsData: initialStaffData } = useFetch(userServices.getAllStaff);
  const { responsData: initialRoleData } = useFetch(roleServices.getAllRole);
  const [staffData, setStaffData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  useEffect(() => {
    if (initialStaffData && initialRoleData) {
      setStaffData(initialStaffData);
      setRoleData(initialRoleData);
    }
  }, [initialStaffData, initialRoleData]);
  const optionsRole = roleData.map((role) => ({
    value: role._id,
    title: role.role_Name
  }));
  return (
    <div>
      <SectionWrapper title='Management staff' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={managementStaffBreadcrumb} />
        <TableManagerAccount
          roleData={optionsRole}
          addClassNames={'w-[100%]'}
          data={staffData}
          titleRow={titleRow}
          handleDelete={(id) => handleDelete(id, staffData, setStaffData, userServices.deleteUser, confirmDialog)}
          handleIsActiveAccount={(id) =>
            handleIsActiveAccount(id, userServices.getAllStaff, setStaffData, authServices.handleIsActiveAccount)
          }
          handleUpdateRoleAccount={(idUser, idRole) =>
            handleUpdateRoleAccount(idUser, idRole, roleServices.updateRoleUser)
          }
        />
      </SectionWrapper>
    </div>
  );
};

export default ManagementStaff;
