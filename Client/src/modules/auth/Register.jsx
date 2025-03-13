import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import authServices from "../../services/authService";
import formAuthSchema from "../../utils/validations/formAuth";
import { InputText } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import useGoogleLoginHook from "../../hooks/useGoogleLoginHook";
import Logo from '../../assets/images/logo/logo.png'
import { SpinnerLoading } from "../../components/ui/loaders";
import { ToggleFormContext } from "../../contexts/ToggleFormContext";
import tokenService from "../../services/tokenService";
import AppIcons from '../../components/ui/icon/index'
const Google = (props) => <svg width="1em" height="1em" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>;
const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: yupResolver(formAuthSchema.register) });
    const { setDialogState } = useContext(ToggleFormContext)
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (formData) => {
        setIsLoading(true);
        setDisabed(true)
        const data = await authServices.register(
            {
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password,
                provider: "local",
            }
        );
        if (!data) {
            setTimeout(() => {
                setIsLoading(false);
                setDisabed(false)
            }, 1000)
            return
        }
        setDialogState({ isOpen: true, type: "verifyEmail" })

        setIsLoading(false);
        setDisabed(false)
        tokenService.setDisposableEmail(formData.email)
        //   
    };
    const login = useGoogleLoginHook()
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
        <>

            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-[#FEFEFE] rounded-lg">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className=" md:h-auto md:w-[70%] flex justify-center items-center ">
                        <img
                            aria-hidden="true"
                            className=" w-full h-[220px] dark:block max-md:h-[100px] max-md:w-[200px] max-md:p-3"
                            src={Logo}
                            alt="Office"
                        />
                    </div>
                    <main className="flex items-center justify-center p-3 sm:p-1 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-3 text-2xl font-semibold text-[#2563eb]">Đăng ký</h1>
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <label className="block text-sm text-gray-800 font-semibold pb-2">
                                    Tên người dùng
                                </label>
                                <InputText
                                    refinput={register("fullname")}
                                    type="text" placeholder="Nhập tên của bạn"
                                    addClassNames="block w-full px-3 py-1 text-sm focus:outline-none  rounded-md   focus:ring  border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                                    name="fullname"
                                />
                                {errors.fullname && (
                                    <p className="text-red-500 text-sm">
                                        {errors.fullname.message}
                                    </p>
                                )}
                                <div className="mt-3"></div>
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
                                    <p className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                                <div className="mt-3"></div>
                                <label className="block text-sm text-gray-800 font-semibold pb-2">
                                    Mật khẩu
                                </label>
                                <div className=" relative">
                                    <InputText
                                        refinput={register("password")}
                                        addClassNames="block w-full px-3 py-1 text-sm focus:outline-none  rounded-md   focus:ring  border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="***************"
                                    />
                                    <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2" onClick={togglePasswordVisibility}>
                                        <AppIcons.EyeIcon />
                                    </div>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                                <div className="mt-3"></div>
                                <label className="block text-sm text-gray-800 font-semibold pb-2">
                                    Xác nhận lại mật khẩu
                                </label>
                                <InputText
                                    refinput={
                                        register("confirmPassword")

                                    }
                                    className="block px-3 py-1 text-sm   rounded-md   focus:ring  border h-12  focus:outline-none  w-full bg-gray-100 border-transparent" type="password" placeholder="Xác nhận lại mật khẩu" />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                                <Button
                                    disabled={disabled || isLoading}
                                    type="submit"
                                    addClassNames="w-full mt-6 h-12 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring focus:ring-purple-300 flex justify-center"
                                >
                                    {isLoading ? <SpinnerLoading size="30" color='#fff' /> : "Đăng ký"}
                                </Button>
                                <hr className="my-2 " />
                                <Button
                                    type="button"
                                    onClick={login}
                                    className="w-full h-11 md:h-12 text-sm inline-flex items-center justify-center my-2 text-gray-700 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-300 duration-150"
                                >
                                      <Google  className="w-6 h-6" />
                                    <span className="ml-2">Đăng nhập với google</span>
                                </Button>
                            </form>

                            <p onClick={() => setDialogState({ isOpen: true, type: 'forgotPassword' })} className=" cursor-pointer text-sm font-medium text-blue-500  hover:underline">
                                Quên mật khẩu
                            </p>
                            <p onClick={() => setDialogState({ isOpen: true, type: "verifyEmail" })
                            } className=" cursor-pointer text-sm font-medium text-blue-500  hover:underline">
                                Xác thực tài khoản
                            </p>


                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Register;
