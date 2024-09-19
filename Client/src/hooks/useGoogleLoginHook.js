import { useGoogleLogin } from "@react-oauth/google";
import { showToastError } from "../configs/toastConfig";
import userServices from "../services/user";
import http from "../utils/helpers/http";
import END_POIND_API from "../utils/helpers/endpoind";
import tokenService from "../services/tokenService";
const useGoogleLoginHook = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const authLoginGoogle = await userServices.getAuthLoginGoogle(tokenResponse?.access_token)
      try {
        const { data } = await http.post(`${END_POIND_API.AUTH}/loginGoogle`, {
          fullname: authLoginGoogle?.name,
          email: authLoginGoogle?.email,
          googleId: authLoginGoogle?.sub,
          avatar: authLoginGoogle?.picture,
          emailVerify: authLoginGoogle?.email_verified
        });
        if (!data) return
        tokenService.setAccessToken( data?.accessToken)
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
