import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import authServices from "../../services/authService";
import formAuthSchema from "../../utils/validations/formAuth";
const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: yupResolver(formAuthSchema.register) });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (formData) => {
        setIsLoading(true);
        const reponse = await authServices.register(
            {
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password,
                provider: "local",
            }
        );
        if (!reponse) {
            return
        }
        setIsLoading(false);
    };
    const password = watch("password");

    return (
        <>
            <div className="rounded-[10px] bg-[#fff] flex gap-2 w-[60%] border-2 border-slate-300">
                <img className="w-[400px]" src="https://www.medigoapp.com/assets/images-html/login-install-app-desktop.webp" alt="" />
                <div className="w-full p-2">
                    <h1 className="text-[#f60b8a] font-bold text-[30px]">Chào bạn!</h1>
                    <span className="text-[16px]">Vui lòng đăng nhập hoặc đăng ký</span>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <input  {...register("fullname")} type="text" placeholder="Nhập tên của bạn" className="block w-full border-2 border-slate-200 mb-2 p-2 rounded-[5px] text-[16px] outline-none" />
                        {errors.fullname && (
                            <p className="text-red-500 text-sm">
                                {errors.fullname.message}
                            </p>
                        )}
                        <input
                            {...register("email", {
                                required: "Email là bắt buộc.",
                                pattern: {
                                    value:
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Email không hợp lệ.",
                                },
                            })} type="email" placeholder="Nhập email của bạn" className="block w-full border-2 border-slate-200 mb-2 p-2 rounded-[5px] text-[16px] outline-none" />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                        <input
                            {...register("password")} type="password" className="block w-full border-2 border-slate-200 mb-2 p-2 rounded-[5px] text-[16px] outline-none" placeholder="Tạo mật khẩu" />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                        <input
                            {...register("confirmPassword", {
                                validate: (value) =>
                                    value === password ||
                                    "Mật khẩu xác nhận không khớp.",
                            })} className="block w-full border-2 border-slate-200 mb-2 p-2 rounded-[5px] text-[16px] outline-none" type="password" placeholder="Xác nhận lại mật khẩu" />
                        <button type="submit" className="block bg-[#f60b8a] w-full text-[#fff] p-2 rounded-[5px] text-[16px] font-medium">
                            {isLoading ? " Đang" : "Đăng ký"}
                        </button>
                        <span className="block text-center py-2">Hoặc</span>
                        <div className=" bg-slate-100  py-2 px-4 rounded hover:bg-slate-200 transition duration-300 w-full text-center text-[#333] text-[14px] flex justify-center items-center">
                            <img
                                src="https://img-cache.coccoc.com/image2?i=2&l=84/93650057"
                                alt="Google logo"
                                className="w-5 h-5 mr-2"
                            />
                            <span>  Đăng nhập bằng Google</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;