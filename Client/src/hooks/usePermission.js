import { ROLE_ADMIN, ROLE_STAFF, ROLE_CUSTOMMER } from '../utils/constant/common';

const usePermission = (user = {}) => {
  console.log(user);
  const checkIsRoleUser = (roles = []) => {
    if (!Array.isArray(roles)) {
      return false;
    }
    return roles.some((role) => role === user?.role_id?.role_Name);
  };

  const isAdmin = () => checkIsRoleUser([ROLE_ADMIN]);
  const isUser = () => checkIsRoleUser([ROLE_CUSTOMMER]);
  const isStaff = () => checkIsRoleUser([ROLE_STAFF]);
  const isAdminOrStaff = () => checkIsRoleUser([ROLE_ADMIN, ROLE_STAFF]);

  return { checkIsRoleUser, isAdmin, isUser, isStaff, isAdminOrStaff };
};

export default usePermission;
