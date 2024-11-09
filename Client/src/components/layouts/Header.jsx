import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import Logo from '../../assets/images/logo/logo3.png';
import { InputText } from '../../components/ui/form/index';
import { Button } from '../../components/ui/button/index';
import { UserContext } from '../../contexts/UserContext';
import { ToggleFormContext } from '../../contexts/ToggleFormContext';
import authServices from '../../services/authService';
import AppIcons from '../ui/icon';
import SpinnerLoading from '../../components/ui/loaders/SpinnerLoading';
import categoryServices from '../../services/categoryService';
import useFetch from '../../hooks/useFetch';
import { CartContext } from '../../contexts/CartContext';
import searchProductServices from '../../services/searchProductService';
import debounce from '../../hooks/useDebounce';
import formatsHelper from '../../utils/helpers/formats';
import { TabUIAccountContext } from '../../contexts/TabUIAccountContext';

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


const redirectOrder = ()=>{
    navigate(`${PATH_ROUTERS_CLIENT.ACCOUNT}`)
    setTabIndex(3)
}
const redirectHistoryOrder= ()=>{
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

  const debouncedFetchProducts = debounce(getProductSearch, 3000);

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

    return (
        <div className={`ease-in-out sticky top-0 z-30`}>
            <header>
                <div className='bg-[#2563EB]'>
                    <div className="flex items-center justify-between p-2 w-[90%] m-auto">
                        <div className='flex gap-2 items-center'>
                            <Link to={PATH_ROUTERS_CLIENT.HOMEPAGE}>
                                <img className='w-[200px]' src={Logo} alt="Logo" />
                            </Link>
                            <div className='relative'>
                                <div className="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " onClick={handleSearchQueryProduct}>
                                    <AppIcons.SearchIcons addClassNames='text-[#a8a8a8] text-[20px] ' />
                                </div>
                                <InputText
                                    onChange={handleChange}
                                    addClassNames={"rounded-[5px] w-[400px] h-[50px] pl-[10px] text-[16px] pl-10"}
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
                                    <div className="absolute bg-[#fff] w-full rounded-[5px] z-30 p-5">
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
                        <div className='flex gap-5 items-center '>
                            {user ? (
                                <div className="flex items-center justify-end w-[230px] ">
                                    <div className="flex items-center relative gap-3 group">
                                        <span className='text-[#fff]'>Chào bạn</span>
                                        <div className=' p-1 cursor-pointer'>
                                            {user?.avatar ? (
                                                <img className='w-[40px] rounded-[50%]' src={user?.avatar} alt="avatar" />
                                            ) : (
                                                <AppIcons.UserIcon addClassNames='text-[#2563EB] bg-[#fff] rounded-[50%] w-[40px] h-[40px] p-1 ' />
                                            )}
                                        </div>
                                        <div className='hidden group-hover:block absolute top-[25px] pt-[35px] z-10'>
                                            <div className='w-[250px] bg-[#fff] shadow p-3 rounded-[5px] '>
                                                <span className='block'>Xin chào</span>
                                                <span className='block font-bold'>{user?.fullname}</span>
                                                {user?.role_id?.role_Name.includes("admin") && (
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
                                                        <span><AppIcons.OderIcon addClassNames='text-gray-800' /></span>
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

)};

export default Header;
