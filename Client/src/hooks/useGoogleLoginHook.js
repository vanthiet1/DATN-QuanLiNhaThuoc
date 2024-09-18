import { useGoogleLogin } from "@react-oauth/google";
import { showToastError } from "../configs/toastConfig";
import userServices from "../services/user";
import http from "../utils/http";
import URL_API from "../utils/api";
const useGoogleLoginHook = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const authLoginGoogle = await userServices.getAuthLoginGoogle(tokenResponse?.access_token)
      try {
        const { data } = await http.post(`${URL_API.Auth}/loginGoogle`, {
          fullname: authLoginGoogle?.name,
          email: authLoginGoogle?.email,
          googleId: authLoginGoogle?.sub,
          avatar: authLoginGoogle?.picture,
          emailVerify: authLoginGoogle?.email_verified
        });
        console.log(data)
        if (!data) return
        localStorage.setItem("access_token", data?.accessToken)
        window.location.reload()
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
