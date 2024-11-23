import { Navigate,useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { PATH_ROUTERS_ADMIN } from '../utils/constant/routers';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={'/'} />;
  }
  const role = user?.role_id?.role_Name;
  if (typeof role !== "string" || role !== "admin" && role !== "staff") {
    return <Navigate to="/" replace />
  }

  return <>{children}</>;
};

export default ProtectedRoute;
