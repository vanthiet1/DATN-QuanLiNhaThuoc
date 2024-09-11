import { useGoogleLogin } from "@react-oauth/google";
import { showToastError } from "../configs/toastConfig";
import userServices from "../services/user";
import http from "../utils/http";
import URL_API from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
const useGoogleLoginHook = () => {
  const { fetchUser } = useContext(UserContext)
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      localStorage.setItem("google_access_token", tokenResponse.access_token)
      const authLoginGoogle = await userServices.getAuthLoginGoogle(tokenResponse?.access_token)
      console.log(authLoginGoogle);
      try {

        await http.post(`${URL_API.Auth}/loginGoogle`, {
          fullname: authLoginGoogle?.name,
          email: authLoginGoogle?.email,
          googleId: authLoginGoogle?.sub,
          avatar: authLoginGoogle?.picture,
          emailVerify: authLoginGoogle?.email_verified
        });
        await fetchUser()
      
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    },
    onError: () => {
      showToastError("Đăng nhập thất bại");
    },
  });
  return login
}
export default useGoogleLoginHook
