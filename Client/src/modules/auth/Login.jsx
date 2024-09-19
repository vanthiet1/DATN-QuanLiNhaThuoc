import { useContext } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import formAuthSchema from "../../utils/validations/formAuth";
import useGoogleLoginHook from "../../hooks/useGoogleLoginHook";
import { UserContext } from "../../contexts/UserContext";
const Login = () => {
    const {fetchUser} = useContext(UserContext)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(formAuthSchema.login) });
    const onSubmit = async (formData) => {
        await authServices.login(
            {
                email: formData.email,
                password: formData.password,
            }
        );
     await fetchUser()
    };


    const login = useGoogleLoginHook()

    return (
        <>
            <div className="rounded-[10px] bg-[#fff] flex gap-2 w-[60%] border-2 border-slate-300">
                <img className="w-[400px]" src="https://www.medigoapp.com/assets/images-html/login-install-app-desktop.webp" alt="" />
                <div className="w-full p-2">
                    <h1 className="text-[#f60b8a] font-bold text-[30px]">Chào bạn!</h1>
                    <span className="text-[16px]">Vui lòng đăng nhập hoặc đăng ký</span>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("email", {
                                pattern: {
                                    value:
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                        <button type="submit" className="block bg-[#f60b8a] w-full text-[#fff] p-2 rounded-[5px] text-[16px] font-medium">
                            Đăng nhập
                        </button>
                        <span className="block text-center py-2">Hoặc</span>
                        <div  onClick={login} className=" cursor-pointer bg-slate-100  py-2 px-4 rounded hover:bg-slate-200 transition duration-300 w-full text-center text-[#333] text-[14px] flex justify-center items-center">
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

export default Login;