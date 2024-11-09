import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button/index';
import { UserContext } from '../../../contexts/UserContext';
import userServices from '../../../services/userService';
import { regexPhoneNumber } from '../../../configs/regex';
import { showToastError } from '../../../configs/toastConfig';
function Security() {
    const { user } = useContext(UserContext)
    const [phoneNumber, setPhoneNumber] = useState("")
    const updatePhoneNumberUser = async () => {
        if (!regexPhoneNumber(phoneNumber)) {
            return showToastError("SDT ko hợp lệ")
        }
        await userServices.updatePhoneNumberUser(user?._id, { phoneNumber: phoneNumber })
    }
    useEffect(() => {
        if (user) {
            setPhoneNumber(user?.phone || "");
        }
    }, [user])
    return (
        <div className='flex flex-col gap-3 '>
            <div className='mb-2'>
                <div class="rounded-[15px] border border-[#2563EB] pl-3 py-2 mb-1">
                    <span class="text-[#2563EB] block font-semibold text-[17px]">Email </span>
                    <span class="text-[#333] block font-semibold">{user?.email || "Chưa đăng nhập"}  </span>
                </div>
                <div className='pl-3'>
                    {user?.emailVerify ? (
                        <span className='text-green-600 font-bold'>Đã xác thực</span>
                    ) : (
                        <span className='text-red-600 font-bold'>Chưa xác thực</span>
                    )}
                </div>
            </div>
            <div className='mb-2'>
                <label className=' mb-1 pl-3  block text-[#2563eb]  font-semibold text-[17px]'>Số điện thoại</label>
                <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type='number'
                    // size='l'
                    // rounded='m'
                    className='w-full pl-3 py-3   border border-[#2563EB] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-[10px]'
                    placeholder='Chưa cập nhật số điện thoại'
                />
                <div className='pl-3'>
                    {user?.phone ? (
                        <span className='text-green-600 font-bold'>Đã xác thực</span>
                    ) : (
                        <span className='text-red-600 font-bold'>Chưa xác thực</span>
                    )}
                </div>
            </div>
            <div>
                <Button
                    onClick={updatePhoneNumberUser}
                    size='m'
                    rounded='l'
                    addClassNames='bg-[#2563EB] text-[#fff] px-5 py-2 w-full sm:w-auto flex justify-center items-center'
                    outline
                >
                    Xác thực
                </Button>
                <p className='mt-2'>
                    Bạn không có nhu cầu sử dụng tài khoản này nữa?{' '}
                    <Link to={'/tai-khoan/xoa-tai-khoan'} className='text-[#2563EB] font-bold'>
                        Xóa tài khoản
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Security;