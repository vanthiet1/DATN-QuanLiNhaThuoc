import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputText } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import formAuthSchema from "../../utils/validations/formAuth";
import forgotPasswordServices from "../../services/forgotPasswordService";

const NewPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(formAuthSchema.newPassword) });
  const [isLoading, setIsLoading] = useState(false); 
  const onSubmit = async (formData) => {
    console.log(formData);
    setIsLoading(true);
    const response = await forgotPasswordServices.forgotPassword( formData );
    if (response === undefined) {
      setIsLoading(false);
      return; 
    }

    setIsLoading(false); 
  };

  return (
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
            <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Tạo lại mật khẩu mới</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-sm text-[#fff]  font-medium pb-2">
                Email
              </label>
              <InputText
                refinput={register("email")}
                type="email" 
                placeholder="Nhập email của bạn"
                addClassNames="block w-full px-3 py-1 text-sm focus:outline-none rounded-md focus:ring border h-12 text-sm block w-full bg-gray-100 border-transparent "
                name="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
              <div className="mt-4"></div>
              <label className="block text-sm text-[#fff] font-medium pb-2">
                Tạo mật khẩu mới
              </label>
              <InputText
                refinput={register("newPassword")}
                type="text" 
                placeholder="Nhập mật khẩu mới của bạn"
                addClassNames="block w-full px-3 py-1 text-sm focus:outline-none rounded-md focus:ring border h-12 text-sm block w-full bg-gray-100 border-transparent  "
                name="newPassword"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
               <div className="mt-4"></div>
              <label className="block text-sm text-[#fff] font-medium pb-2">
               Nhập mã xác thực
              </label>
              <InputText
                refinput={register("code")}
                type="text" 
                placeholder="Nhập mật khẩu mới của bạn"
                addClassNames="block w-full px-3 py-1 text-sm focus:outline-none rounded-md focus:ring border h-12 text-sm block w-full bg-gray-100 border-transparent "
                name="newPassword"
              />
              {errors.code && (
                <p className="text-red-500 text-sm">
                  {errors.code.message}
                </p>
              )}
              <div className="mt-4"></div>
              <Button
                disabled={isLoading} 
                addClassNames="w-full mt-4 h-12 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring focus:ring-purple-300 flex justify-center "
                type="submit"
              >
                {isLoading ? "Đang..." : "Đổi mật khẩu"} 
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewPassword;
