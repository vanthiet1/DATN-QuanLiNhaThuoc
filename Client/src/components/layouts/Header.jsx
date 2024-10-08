import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import Logo from '../../assets/images/logo/logo3.png';
import { InputText } from '../../components/ui/form/index';
import { Button } from '../../components/ui/button/index';
import { UserContext } from '../../contexts/UserContext'
import { ToggleFormContext } from '../../contexts/ToggleFormContext';
import authServices from '../../services/authService';
import AppIcons from '../ui/icon';
// import SpinnerLoading from "../ui/loaders/SpinnerLoading";
import categoryServices from "../../services/categoryService";
import useFetch from '../../hooks/useFetch'

const Header = () => {
    const { user } = useContext(UserContext)
    const { handleOpenDialog } = useContext(ToggleFormContext)
    const { responsData: initialCategoryData } = useFetch(categoryServices.getCategory);
    return (
        <div>
            <header>
                <div className='bg-[#2563EB] '>
                    <div className="flex items-center justify-between p-2 w-[90%] m-auto">
                        <div className='flex gap-2 items-center'>
                            <Link to={PATH_ROUTERS_CLIENT.HOMEPAGE}>
                                <img className='w-[200px]' src={Logo} alt="" />
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
                                            <div className=' hidden group-hover:block absolute top-[30px] pt-[35px] z-10'>
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
                </div>
            </header>
            <nav>
                <div className=" border-1 w-[100%]  p-4 shadow-lg">
                    <div className=" flex justify-between items-center gap-2 w-[90%] m-auto">
                        {initialCategoryData && initialCategoryData.map((category) => (
                            <div className="flex items-center group relative" key={category._id}>
                                <Link to={`/danh-muc/${category._id}`}>
                                    <span className="w-max cursor-pointer hover:text-[#2563EB] duration-200 text-[15px] font-semibold">{category?.name}</span>
                                </Link>
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <div className="ml-3">
                                        <AppIcons.ArrowDown
                                            addClassNames="inline-block ml-1 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#2563EB]"
                                        />
                                        <div className='absolute left-[-5px] pt-[17px] z-20'>
                                            <div className="hidden max-h-0 overflow-hidden group-hover:max-h-[500px] duration-500 group-hover:duration-500 group-hover:block bg-[#fff] w-[250px] shadow-2xl p-4 rounded-[5px] ">
                                                {category.subcategories.map((sub) => (
                                                    <div key={sub._id}>
                                                        <Link to={`/danh-muc/${sub._id}`}>
                                                            <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold">
                                                                {sub?.name}
                                                            </span>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
