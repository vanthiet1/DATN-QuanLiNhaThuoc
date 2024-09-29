import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import authServices from "../../services/authService";
import formAuthSchema from "../../utils/validations/formAuth";
import { InputText } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import useGoogleLoginHook from "../../hooks/useGoogleLoginHook";
const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: yupResolver(formAuthSchema.register) });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (formData) => {
        console.log(formData.fullname);
        console.log(formData.email);
        console.log(formData.password);
        console.log(formData.confirmPassword);



        setIsLoading(true);
        const reponse = await authServices.register(
            {
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password,
                provider: "local",
            }
        );
        console.log(reponse);

        if (!reponse) {
            return
        }
        setIsLoading(false);
    };
    const login = useGoogleLoginHook()


    return (
        <>

            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src="/static/media/login-office.c7786a89.jpeg"
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src="https://mernshop-admin.vercel.app/static/media/login-office.c7786a89.jpeg"
                            alt="Office"
                        />
                    </div>
                    <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Đăng ký</h1>
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                           
                                <label className="block text-sm text-gray-700 dark:text-gray-400 font-medium pb-2">
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
                                <label className="block text-sm text-gray-700 dark:text-gray-400 font-medium pb-2">
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
                                <label className="block text-sm text-gray-700 dark:text-gray-400 font-medium pb-2">
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
                                <label className="block text-sm text-gray-700 dark:text-gray-400 font-medium pb-2">
                                    Xác nhận lại mật khẩu
                                </label>
                                <InputText
                                    refinput={
                                        register("confirmPassword")

                                    }
                                    className="block w-full border-2 border-slate-200 mb-2  p-2 rounded-[5px] text-[16px] outline-none" type="password" placeholder="Xác nhận lại mật khẩu" />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                                <Button
                                    type="submit"
                                    addClassNames="w-full mt-4 h-12 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring focus:ring-purple-300 flex justify-center"
                                >
                                    {isLoading ? " Đang" : "Đăng ký"}
                                </Button>
                                <hr className="my-10 " />
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
                            <p className="mt-4">
                                <a className="text-sm font-medium text-blue-500  hover:underline" href="/forgot-password">
                                    Quên mật khẩu
                                </a>
                            </p>

                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Register;