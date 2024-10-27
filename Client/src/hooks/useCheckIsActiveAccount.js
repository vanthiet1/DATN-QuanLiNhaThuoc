import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const useCheckIsActiveAccount = () => {
  const { user } = useContext(UserContext) || null
  console.log(user);
  
    const navigate = useNavigate();  
  
  useEffect(() => {
    if(!user) return
    if (user?.is_active === 0) { 
      console.log("Tài khoản của bạn tạm khóa, vui lòng liên hệ admin.");
      navigate('cc/cc/cc')
    }
  }, [user,navigate]);  
};

export default useCheckIsActiveAccount;
