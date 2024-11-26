import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import Logo from '../../assets/images/logo/logo3.png';
import { InputText } from '../../components/ui/form/index';
import { Button } from '../../components/ui/button/index';
import { UserContext } from '../../contexts/UserContext';
import { ToggleFormContext } from '../../contexts/ToggleFormContext';
import authServices from '../../services/authService';
import AppIcons from '../ui/icon';
import SpinnerLoading from '../../components/ui/loaders/SpinnerLoading';
import categoryServices from "../../services/categoryService";
import useFetch from '../../hooks/useFetch';
import { CartContext } from '../../contexts/CartContext';
import searchProductServices from '../../services/searchProductService';
import debounce from '../../hooks/useDebounce';
import formatsHelper from '../../utils/helpers/formats';
import { TabUIAccountContext } from '../../contexts/TabUIAccountContext';
import orderServices from '../../services/orderService';

const Header = () => {
    const { user } = useContext(UserContext) || { user: null };
    const { setTabIndex, } = useContext(TabUIAccountContext) || null;

    const navigate = useNavigate()
    const { cart } = useContext(CartContext);
    const { handleOpenDialog } = useContext(ToggleFormContext);
    const { responsData: initialCategoryData } = useFetch(categoryServices.getCategory);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowCategory, setIsShowCategory] = useState(false);
    const [orderProduct, setOrderProduct] = useState(0);

    const redirectOrder = () => {
        navigate(`${PATH_ROUTERS_CLIENT.ACCOUNT}`)
        setTabIndex(3)
    }
    const redirectHistoryOrder = () => {
        navigate(`${PATH_ROUTERS_CLIENT.ACCOUNT}`)
        setTabIndex(4)
    }

    const getProductSearch = async () => {
        if (!searchKeyword.trim()) return setProducts([]);
        setIsLoading(true);
        const data = await searchProductServices.getProductByKeyword(searchKeyword);
        if (!data) return;
        setProducts(data);
        setIsLoading(false);
    }

    const debouncedFetchProducts = debounce(getProductSearch, 2000);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchKeyword(value);
        if (value.trim() === '') {
            setProducts([]);
        } else {
            if (value !== ' ') {
                setSearchKeyword(value.trim().replace(/\s+/g, ' '));
                debouncedFetchProducts();
            }
        }
    };

    const handleSearchQueryProduct = async () => {
        if (searchKeyword.trim()) {
            navigate(`product/search?q=${encodeURIComponent(searchKeyword)}`);
        }
        setSearchKeyword("")
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchQueryProduct();
        }
    };

    useEffect(() => {
        const getDataOrder = async () => {
            if (user?._id) {
                    const dataOrder = await orderServices.getOrderByUserId(user._id);
                    const filteredOrders = dataOrder?.filter(order => order.status === 1);
                    setOrderProduct(filteredOrders || []);
            }
        };
        getDataOrder();
    }, [user?._id]); 

    return (
        <div className={`ease-in-out sticky top-0 z-30`}>
            <header>
                <div className='bg-[#2563EB]'>
                    <div className="flex items-center justify-between p-2 w-[90%] m-auto max-md:w-full ">
                        <div className='flex gap-2 items-center  max-md:flex-col'>
                            <Link to={PATH_ROUTERS_CLIENT.HOMEPAGE}>
                                <div className='w-[200px] max-md:w-[130px] max-md:pb-1'>
                                    <img className='w-[100%]' src={Logo} alt="Logo" />
                                </div>
                            </Link>
                            <div className='relative max-md:w-full max-md:absolute max-md:left-0 max-md:top-[55px]'>
                                <div className="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " onClick={handleSearchQueryProduct}>
                                    <AppIcons.SearchIcons addClassNames='text-[#a8a8a8] text-[20px] ' />
                                </div>
                                <InputText
                                    onChange={handleChange}
                                    addClassNames={"max-md:w-full rounded-[5px] w-[400px] h-[50px] pl-[10px] text-[16px] pl-10"}
                                    placeholder="Bạn đang tìm gì?"
                                    onKeyDown={handleKeyDown}
                                />
                                <div className='absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2'>
                                    {isLoading && (
                                        <div className="flex justify-center items-center">
                                            <SpinnerLoading size={20} />
                                        </div>
                                    )}
                                </div>
                                {searchKeyword && (
                                    <div className="absolute bg-[#fff] w-full rounded-[5px] z-30 p-5 h-[500px] overflow-auto">
                                        <div>
                                            {products?.length > 0 ? (
                                                products.map((product) => (
                                                    <Link to={`/product/${product.slug}`} key={product._id}>
                                                        <div className="flex gap-3" onClick={() => setSearchKeyword("")}>
                                                            <img className='w-[70px] h-[70px] object-cover' src={product?.images[0]?.url_img} alt={product?.name} />
                                                            <div>
                                                                <span className='block'>{product?.name}</span>
                                                                <span className='block'>{formatsHelper.currency(product?.price_old)}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <span className='flex justify-center'>Không tìm thấy sản phẩm</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className='flex gap-5 items-center max-md:gap-3 max-md:pr-5'>
                            {user ? (
                                <div className="flex items-center justify-end w-[230px] max-md:w-[100%]">
                                    <div className="flex items-center relative gap-3 group">
                                        <span className='text-[#fff] max-md:hidden '>Chào bạn</span>
                                        <div className=' p-1 cursor-pointer'>
                                            {user?.avatar ? (
                                                <img className='w-[40px] rounded-[50%]' src={user?.avatar} alt="avatar" />
                                            ) : (
                                                <AppIcons.UserIcon addClassNames='text-[#2563EB] bg-[#fff] rounded-[50%] w-[40px] h-[40px] p-1 ' />
                                            )}
                                        </div>
                                        <div className='hidden group-hover:block absolute top-[25px] pt-[35px] z-10 max-md:left-[-100px]'>
                                            <div className='w-[250px] bg-[#fff] shadow p-3 rounded-[5px] '>
                                                <span className='block'>Xin chào</span>
                                                <span className='block font-bold'>{user?.fullname}</span>
                                                {(user?.role_id?.role_Name.includes("admin") || user?.role_id?.role_Name.includes("staff")) && (
                                                    <Link to={`/${PATH_ROUTERS_ADMIN.DASHBOARD}`}>
                                                        <div className="flex mt-3 items-center gap-2 cursor-pointer pb-1 group hover:text-[#2563EB] duration-200">
                                                            <span><AppIcons.UserIcon addClassNames='text-gray-800' /></span>
                                                            <span>Quản trị</span>
                                                        </div>
                                                    </Link>
                                                )}
                                                <Link to={`/${PATH_ROUTERS_CLIENT.ACCOUNT}`}>
                                                    <div className="flex mt-3 items-center gap-2 cursor-pointer pb-1 group hover:text-[#2563EB] duration-200">
                                                        <span><AppIcons.UserIcon addClassNames='text-gray-800' /></span>
                                                        <span>Thông tin tài khoản</span>
                                                    </div>
                                                </Link>
                                                <div className="flex mt-3 items-center gap-2 cursor-pointer pb-1 group hover:text-[#2563EB] duration-200" onClick={redirectOrder}>
                                                    <span className='relative'>
                                                    <AppIcons.OderIcon addClassNames='text-gray-800' />
                                                        <div className="absolute top-[-10px] right-[-7px]">
                                                            <span className='text-[#fff] bg-red-500 flex justify-center items-center rounded-[50%] w-[15px] h-[15px] text-[10px] pl-[1px]'>
                                                            {orderProduct ? orderProduct.length : 0}
                                                            </span>
                                                        </div>
                                                    </span>
                                                    <span>Đơn hàng xử lí</span>
                                                </div>
                                                <div className="flex mt-3 items-center gap-2 cursor-pointer pb-1 group hover:text-[#2563EB] duration-200" onClick={redirectHistoryOrder}>
                                                    <span><AppIcons.BanknotesIcon addClassNames='text-gray-800' /></span>
                                                    <span>Lịch sử đặt hàng</span>
                                                </div>
                                                <hr className='my-2 border-gray-300' />
                                                <div className="flex mt-3 items-center gap-2 cursor-pointer group hover:text-[#2563EB] duration-200">
                                                    <span><AppIcons.LogIcon addClassNames='text-gray-500' /></span>
                                                    <span onClick={authServices.logout}>Đăng xuất</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <Button onClick={() => handleOpenDialog('login')} addClassNames='text-[16px] text-[#fff] font-normal '>
                                            Đăng nhập
                                        </Button>
                                        <Button onClick={() => handleOpenDialog('register')} addClassNames='text-[16px] text-[#fff] font-normal '>
                                            Đăng ký
                                        </Button>
                                    </div>
                                </>
                            )}
                            <div className='flex gap-4 max-md:gap-2'>
                                <AppIcons.ChatIcon addClassNames='text-[#fff] cursor-pointer' width='20px' height='20px' />
                                <div className='w-[2px] h-[20px] bg-[#fff] rounded-md'></div>
                                <Link to={'/gio-hang'}>
                                    <div className='relative'>
                                        <AppIcons.OderIcon addClassNames='text-[#fff] cursor-pointer' width='20px' height='20px' />
                                        {cart && (
                                            <div className="absolute top-[-10px] right-[-12px]">
                                                <span className='text-[#fff] bg-red-500 flex justify-center items-center rounded-[50%] w-[20px] h-[20px] text-[15px]'>
                                                    {cart?.length}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <div className=" border-1 w-[100%] p-4 shadow-lg bg-[#fff] max-md:mt-[40px]  ">
                    <div
                        className="cursor-pointer hidden max-md:block"
                        onClick={() => setIsShowCategory(!isShowCategory)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AppIcons.CategoryIcon addClassNames="text-[#2563eb]" />
                                <span className="text-[#2563eb] font-semibold">
                                    Xem Tất Cả Danh Mục Thuốc
                                </span>
                            </div>
                            <AppIcons.ArrowDown
                                addClassNames={`bg-[#2563eb] rounded-[50%] transition-transform duration-300 ${isShowCategory ? 'rotate-180' : ''
                                    }`}
                            />
                        </div>
                    </div>
                    <div className={` ${!isShowCategory ? 'max-md:overflow-hidden max-md:h-0' : 'max-md-max-h-100'} flex justify-between items-center gap-2 w-[90%] max-md:w-full m-auto max-md:flex-col`}>
                        {initialCategoryData && initialCategoryData.map((category) => (
                            <div className="flex items-center group relative max-md:flex max-md:justify-between max-md:w-full max-md:pt-4 " key={category._id}>
                                <Link to={`/danh-muc/${category._id}`}>
                                    <span className="w-max cursor-pointer hover:text-[#2563EB] duration-200 text-[15px] font-semibold">{category?.name}</span>
                                </Link>
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <div className="ml-3">
                                        <AppIcons.ArrowDown
                                            addClassNames="inline-block ml-1 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#2563EB]"
                                        />
                                        <div className='absolute left-[-5px] pt-[17px] z-20 max-md:w-[104%] max-md:top-[10] max-md:left-[-20px]'>
                                            <div className="hidden max-h-0 overflow-hidden group-hover:max-h-[500px] duration-500 group-hover:duration-500 group-hover:block bg-[#fff] w-[253px] shadow-2xl p-4 rounded-[5px] max-md:w-[100%]  max-md:pb-3 max-md:ml-1">
                                                {category.subcategories.map((sub) => (
                                                    <div key={sub._id}>
                                                        <Link to={`/danh-muc/san-pham-danh-muc/${sub._id}`}>
                                                            <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold max-md:pb-5 cursor-pointer">
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
                        <div className="flex items-center group relative max-md:flex max-md:justify-between max-md:w-full" >
                            <span className="w-max cursor-pointer hover:text-[#2563EB] duration-200 text-[15px] font-semibold max-md:pt-4">Góc sống khỏe</span>
                            <div className="ml-3">
                                <AppIcons.ArrowDown
                                    addClassNames="inline-block ml-1 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#2563EB]"
                                />
                                <div className='absolute left-[-30px] pt-[17px] z-20'>
                                    <div className="hidden max-h-0 overflow-hidden group-hover:max-h-[500px] duration-500 group-hover:duration-500 group-hover:block bg-[#fff] w-[250px] shadow-2xl p-4 rounded-[5px]">
                                        <Link to={PATH_ROUTERS_CLIENT.BLOG}>
                                            <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold cursor-pointer">
                                                Bài Viết
                                            </span>
                                        </Link>
                                        <div >
                                            <Link to={`/${PATH_ROUTERS_CLIENT.BMICALCULATOR}`}>
                                                <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold cursor-pointer">
                                                    Tính chỉ số BMI
                                                </span>
                                            </Link>
                                        </div>
                                        <div >
                                            <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold cursor-pointer">
                                                Công cụ tính ngày dự sinh
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold cursor-pointer">
                                                Công cụ tính ngày rụng trứng
                                            </span>
                                        </div>
                                        <div >
                                            <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold cursor-pointer">
                                                Tra cứu bệnh
                                            </span>
                                        </div>
                                        <div >
                                            <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold cursor-pointer">
                                                Hoạt chất
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Header;