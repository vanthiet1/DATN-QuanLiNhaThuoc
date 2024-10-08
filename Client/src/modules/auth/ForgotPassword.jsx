import { useForm } from "react-hook-form";
import { useState , useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputText } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import formAuthSchema from "../../utils/validations/formAuth";
import forgotPasswordServices from "../../services/forgotPasswordService";
import Logo from '../../assets/images/logo/logo.png'
import { SpinnerLoading } from "../../components/ui/loaders";
import { ToggleFormContext } from "../../contexts/ToggleFormContext";
const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(formAuthSchema.forgotPassword) });
  const {setDialogState} = useContext(ToggleFormContext)
  const [isLoading, setIsLoading] = useState(false); 
  const onSubmit = async (formData) => {
    if (!formData) return;
    setIsLoading(true);
    const response = await forgotPasswordServices.sendCodeForgotPassword({ email: formData.email });
    if (response === undefined) {
      setIsLoading(false);
      return; 
    }
    setIsLoading(false); 
     setDialogState({isOpen:true,type:'newPassword'})
  };


  return (
    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden  rounded-lg ">
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
            <h1 className="mb-6 text-2xl font-semibold text-[#2563eb] ">Quên mật khẩu</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-sm text-gray-800 font-semibold pb-2">
                Email
              </label>
              <InputText
                refinput={register("email")}
                type="email" 
                placeholder="Nhập email của bạn"
                addClassNames="block w-full px-3 py-1 text-sm focus:outline-none rounded-md focus:ring border h-12 text-sm block w-full bg-gray-100 border-transparent"
                name="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm p-1">
                  {errors.email.message}
                </p>
              )}
             
              <Button
                disabled={isLoading} 
                addClassNames="w-full mt-4 h-12 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring focus:ring-purple-300 flex justify-center"
                type="submit"
              >
                {isLoading ? <SpinnerLoading size="30" color='#fff' /> : "Gửi mã xác nhận"} 
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ForgotPassword;
