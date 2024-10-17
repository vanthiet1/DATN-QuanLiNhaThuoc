import { useContext } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import formAuthSchema from "../../utils/validations/formAuth";
import useGoogleLoginHook from "../../hooks/useGoogleLoginHook";
import { UserContext } from "../../contexts/UserContext";
import { InputText } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import Logo from '../../assets/images/logo/logo.png'
import { ToggleFormContext } from "../../contexts/ToggleFormContext";
import tokenService from "../../services/tokenService";
const Login = () => {
  const { fetchUser } = useContext(UserContext)
  const {handleOpenDialog,setDialogState} = useContext(ToggleFormContext)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(formAuthSchema.login) });
  const onSubmit = async (formData) => {
   const data = await authServices.login(
      {
        email: formData.email,
        password: formData.password,
      }
    );
     
    if(!data) return;
     setDialogState({ isOpen: false, type: '' })
     tokenService.removeDisposableEmail()
    await fetchUser()
  };
  const login = useGoogleLoginHook()
  

  return (
    <>
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-[#FEFEFE] rounded-lg ">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className=" md:h-auto md:w-[70%] flex justify-center items-center max-md:mb-5">
            <img
              aria-hidden="true"
              className=" w-full h-[220px] dark:block max-md:h-[130px]"
              src={Logo}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-3 sm:p-1 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-[#2563eb] ">Đăng nhập</h1>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <label className="block text-sm text-gray-800 font-semibold pb-2">
                  Email
                </label>
                <InputText
                  refinput={register("email")}
                  type="email" placeholder="Nhập email của bạn"
                  addClassNames="block w-full px-3 py-1 text-sm focus:outline-none  rounded-md   focus:ring  border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                  name="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm pt-2">
                    {errors.email.message}
                  </p>
                )}
                <div className="mt-6"></div>
                <label className="block text-sm text-gray-800 font-semibold  pb-2">
                  Mật khẩu
                </label>
                <InputText
                  refinput={register("password")}
                  addClassNames="block w-full px-3 py-1 text-sm focus:outline-none  rounded-md   focus:ring  border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                  type="password"
                  name="password"
                  placeholder="***************"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm pt-2">
                    {errors.password.message}
                  </p>
                )}
                <Button
                  addClassNames="w-full mt-4 h-12 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring focus:ring-purple-300 flex justify-center"
                  type="submit"
                >
                 Đăng nhập
                </Button>
                <hr className="my-6" />
                <Button
                type="button"
                  onClick={login}
                  className="w-full h-11 md:h-12 text-sm inline-flex items-center justify-center my-2 text-gray-700 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-300 duration-150"
                >
                  <img
                    src="https://img-cache.coccoc.com/image2?i=2&l=84/93650057"
                    alt="Google logo"
                    className="w-5 h-5 mr-2"
                  />
                  <span className="ml-2">Đăng nhập với google</span>
                </Button>
              </form>
                <p onClick={()=>setDialogState({ isOpen: true, type: 'forgotPassword' })} className="mt-4 text-sm cursor-pointer font-medium text-blue-500  hover:underline" >
                  Quên mật khẩu
                </p>
                <p onClick={() => handleOpenDialog('register')} className="mt-1 cursor-pointer text-sm font-medium text-blue-500  hover:underline">
                  Tạo tài khoản
                </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login;