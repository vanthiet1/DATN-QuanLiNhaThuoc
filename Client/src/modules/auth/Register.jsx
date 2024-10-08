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
const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: yupResolver(formAuthSchema.register) });
    const { setDialogState } = useContext(ToggleFormContext)
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabed] = useState(false)
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


    return (
        <>

            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-[#FEFEFE] rounded-lg">
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
                            <h1 className="mb-3 text-2xl font-semibold text-[#2563eb]">Đăng ký</h1>
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <label className="block text-sm text-gray-800 font-semibold pb-2">
                                    Tên người dùng
                                </label>
                                <InputText
                                    refinput={register("fullname")}
                                    type="text" placeholder="Nhập tên của bạn"
                                    addClassNames="block w-full px-3 py-1 text-sm focus:outline-none  rounded-md   focus:ring  border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                                    name="email"
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
                                <InputText
                                    refinput={register("password")}
                                    addClassNames="block w-full px-3 py-1 text-sm focus:outline-none  rounded-md   focus:ring  border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                                    type="password"
                                    name="password"
                                    placeholder="***************"
                                />
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
                                    <img
                                        src="https://img-cache.coccoc.com/image2?i=2&l=84/93650057"
                                        alt="Google logo"
                                        className="w-5 h-5 mr-2"
                                    />
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