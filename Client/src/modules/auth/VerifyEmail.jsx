import { useRef , useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import formAuthSchema from "../../utils/validations/formAuth";
import { Button } from "../../components/ui/button";
import { InputText } from "../../components/ui/form";
import authServices from "../../services/authService";

const VerifyEmail = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formAuthSchema.verifyEmail),
    });

    const inputsRef = useRef([]);
    const [resendEnabled, setResendEnabled] = useState(true);

    const handleVerifyAccount = async (data) => {
        const payloadVerify = {
            email: data.email,
            code: Number(data.code),
        };
        try {
            await authServices.verifyEmail(payloadVerify);
        } catch (error) {
            console.error("Error from server:", error);
        }
    };
    
 const startResendTimer = (setTimeOtp, setResendEnabled) => {
    setResendEnabled(false);
    const intervalId = setInterval(() => {
        setTimeOtp((prevCountdown) => {
            if (prevCountdown === 0) {
                clearInterval(intervalId);
                setResendEnabled(true);
                return 3000;
            }
            return prevCountdown - 1;
        });
    }, 3000);
    return intervalId;
};

 const ResendClick = (setTimeOtp, setResendEnabled) => {
     startResendTimer(setTimeOtp, setResendEnabled);
};

const handleResendClick = async () => {
    if (!allInfor) {
        console.error("UserData null");
        return;
    }
    const data = {
        email: allInfor
    }
    try {
        ResendClick(setTimeOtp, setResendEnabled)
        await authServices.ResendVerifyCode(data)
    } catch (error) {
        console.log(error);
    }
};

    return (
        <div>
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
                            <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                Xác thực email của bạn
                            </h1>
                            <form onSubmit={handleSubmit(handleVerifyAccount)}>
                                <label className="block text-sm text-gray-700 dark:text-gray-400 font-medium pb-2">
                                    Nhập email của bạn
                                </label>
                                <InputText
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    addClassNames="block w-full px-3 py-1 text-sm focus:outline-none rounded-md focus:ring border h-12 bg-gray-100 border-transparent"
                                    refinput={register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                                <div className="mb-4"></div>

                                <label className="block text-sm text-gray-700 dark:text-gray-400 font-medium pb-2">
                                    Nhập OTP
                                </label>
                                <Controller
                                    name="code"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value } }) => {
                                        const codeArray = value ? value.split("") : Array(6).fill("");

                                        const handleOTPChange = (index, e) => {
                                            let val = e.target.value;
                                            if (!/^\d?$/.test(val)) {
                                                return;
                                            }

                                            const newCode = [...codeArray];
                                            newCode[index] = val;
                                            const newCodeString = newCode.join("");
                                            onChange(newCodeString);

                                            if (val !== "" && index < 5) {
                                                inputsRef.current[index + 1].focus();
                                            }
                                        };

                                        return (
                                            <div className="flex space-x-2">
                                                {[...Array(6)].map((_, index) => (
                                                    <div key={index} className="w-1/6">
                                                        <InputText
                                                            maxLength={1}
                                                            id={`otp-${index}`}
                                                            inputMode="numeric"
                                                            pattern="\d*"
                                                            autoComplete={`otp-${index}`}
                                                            ref={(input) => (inputsRef.current[index] = input)}
                                                            onChange={(e) => handleOTPChange(index, e)}
                                                            value={codeArray[index] || ""}
                                                            addClassNames={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6 pl-6 outline-none ${errors.code ? "ring-red-500" : ""
                                                                }`}
                                                            name={`code-${index}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }}
                                />
                                {errors.code && (
                                    <p className="text-red-500 text-sm">
                                        {errors.code.message}
                                    </p>
                                )}
                                
                                <Button
                                    addClassNames="w-full mt-4 h-12 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring focus:ring-purple-300 flex justify-center"
                                    type="submit"
                                >
                                    Xác thực
                                </Button>
                                <div className="flex gap-1">
                            <span className="text-[#fff]">Bạn có muốn nhận lại mã ?</span>

                            {resendEnabled ? (
                                <span onClick={handleResendClick} className="text-[#fff] font-semibold cursor-pointer">
                                    Gửi Lại ?
                                </span>
                            ) : (
                                <span className="text-[#fff] font-semibold">
                                    {Math.floor(timeOtp / 60)}:{timeOtp % 60 < 10 ? `0${timeOtp % 60}` : timeOtp % 60}
                                </span>
                            )}

                        </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
