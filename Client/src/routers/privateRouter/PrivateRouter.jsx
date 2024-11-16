import { Navigate } from 'react-router-dom';
import usePermission from '../../hooks/usePermission';
import { PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import storageUtil from '../../utils/helpers/storageUtil';

const PrivateRouter = ({ children }) => {
  const userInfor = storageUtil.getItem('userInfor');
  const { isAdminOrStaff } = usePermission();
  if (!userInfor) {
    return <Navigate to={PATH_ROUTERS_CLIENT.HOMEPAGE} />;
  }

  if (!isAdminOrStaff()) {
    return <Navigate to={PATH_ROUTERS_CLIENT.HOMEPAGE} />;
  }

  return children;
};

export default PrivateRouter;
