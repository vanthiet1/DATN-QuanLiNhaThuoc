import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./modules/auth/Register";
import Login from './modules/auth/Login';
import { UserContext } from './contexts/UserContext';
import { useContext } from 'react';
import authServices from './services/auth';
const App = () => {
  const {user} = useContext(UserContext)
  return (
    <div>
      <ToastContainer />
      <Register></Register>
      {user && (
         <>
         <span>{user.fullname}</span>
          <button onClick={authServices.logout}>Đăng xuất</button>
         </>
      )}
      <Login></Login>
    </div>
  );
};

export default App;