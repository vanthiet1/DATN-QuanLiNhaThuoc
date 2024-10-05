import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import Logo from '../../assets/images/logo/logo3.png';
import { InputText } from '../../components/ui/form/index';
import { Button } from '../../components/ui/button/index';
import DiaLog from '../dialog/DiaLog';
import Login from '../../modules/auth/Login';
import Register from '../../modules/auth/Register';
import { UserContext } from '../../contexts/UserContext'
import authServices from '../../services/authService';
import AppIcons from '../ui/icon';

const Header = () => {
    const [dialogState, setDialogState] = useState({ isOpen: false, type: '' });
    const handleOpenDialog = (type) => {
        setDialogState({ isOpen: true, type });
    };
    const handleCloseDialog = () => {
        setDialogState({ isOpen: false, type: '' });
    };
    const { user } = useContext(UserContext)
    console.log(user);
    return (
        <div className='bg-[#2563EB] '>
            <div className="flex items-center justify-between p-2 w-[90%] m-auto">
                <div className='flex gap-2 items-center'>
                    <Link to={PATH_ROUTERS_CLIENT.HOMEPAGE}>
                        <img className='w-[300px]' src={Logo} alt="" />
                    </Link>
                    <InputText
                        addClassNames={"rounded-[5px] w-[400px] h-[50px] pl-[10px] text-[16px]"}
                        placeholder="Bạn đang tìm gì?"
                    />
                </div>
                <div className='flex gap-2 items-center '>
                    {user ? (
                        <>
                            <div className="flex items-center justify-between w-[230px] ">
                                <div className="flex items-center relative gap-3 group">
                                    <span className='text-[#fff]'>Chào bạn</span>
                                    <div className='bg-[#fff] rounded-[50%] p-1 cursor-pointer'>
                                        <AppIcons.UserIcon addClassNames='text-[#2563EB]' />
                                    </div>
                                    <div className=' hidden group-hover:block absolute top-[30px] pt-[35px]'>
                                        <div className='  w-[250px] bg-[#fff] shadow p-3 rounded-[5px] '>
                                            <span className='block'>Xin chào</span>
                                            <span className='block font-bold'>{user?.fullname}</span>
                                            <div className="flex mt-3 items-center gap-2 cursor-pointer pb-1 group hover:text-[#2563EB] duration-200">
                                                <span><AppIcons.UserIcon addClassNames='' /></span>
                                                <span>Thông tin tài khoản</span>
                                            </div>
                                            <div className="flex mt-3 items-center gap-2 cursor-pointer pb-1 group hover:text-[#2563EB] duration-200">
                                                <span><AppIcons.OderIcon addClassNames='' /></span>
                                                <span>Đơn hàng xử lí</span>
                                            </div>
                                            <div className="flex mt-3 items-center gap-2 cursor-pointer pb-1 group hover:text-[#2563EB] duration-200">
                                                <span><AppIcons.BanknotesIcon addClassNames='' /></span>
                                                <span>Lịch sử đặt hàng</span>
                                            </div>
                                            <div className="flex mt-3 items-center gap-2 cursor-pointer pb-2 group hover:text-[#2563EB] duration-200">
                                                <span><AppIcons.UserIcon addClassNames='' /></span>
                                                <span>Mã giảm giá</span>
                                            </div>
                                            <hr className='my-2 border-gray-300' />
                                            <div className="flex mt-3 items-center gap-2 cursor-pointer group hover:text-[#2563EB] duration-200">
                                                <span><AppIcons.LogIcon addClassNames='' /></span>
                                                <span onClick={authServices.logout}>Đăng xuất</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <AppIcons.ChatIcon addClassNames=' text-[#fff] cursor-pointer' width='20px' height='20px' />
                                    <div className='w-[2px] h-[20px] bg-[#fff] rounded-md'></div>
                                     <Link to={'/gio-hang'}>
                                     <AppIcons.OderIcon addClassNames=' text-[#fff] cursor-pointer' width='50px' height='20px' />
                                     </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleOpenDialog('login')} addClassNames='text-[16px] text-[#fff] font-normal '>
                                Đăng nhập
                            </Button>
                            <Button onClick={() => handleOpenDialog('register')} addClassNames='text-[16px] text-[#fff] font-normal '>
                                Đăng ký
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <DiaLog
                onClose={handleCloseDialog}
                isOpen={dialogState.isOpen}
            >
                {dialogState.type === 'login' ? <Login /> : <Register />}
            </DiaLog>
        </div>
    );
};

export default Header;
