import { Link } from 'react-router-dom';
import ImageCartShoping from '../../../assets/images/cart/shopping-cart-has-shopping-bag-i.png'
import { PATH_ROUTERS_CLIENT } from '../../../utils/constant/routers';
import { ToggleFormContext } from '../../../contexts/ToggleFormContext';
import { Button } from '../button';
import { useContext } from 'react';
const NotificationModal = () => {
    const { handleCloseDialog } = useContext(ToggleFormContext)
    return (
        <div>
            <div className="flex justify-center">
                <img className="animate-slideDown w-[300px] bg-transparent" src={ImageCartShoping} alt="" />
            </div>
            <span className="block text-center font-bold text-[20px] animate-slideDown">Thêm vào giỏ hàng thành công</span>
            <span className="block text-center  text-[16px]  animate-slideDown ">Vào giỏ hàng để xem thêm sản phẩm nhé</span>
            <div className="flex justify-center mt-[20px]">
                <Button
                    onClick={() => handleCloseDialog({ isOpen: false, type: '' })}
                    addClassNames='text-[16px] border border-[#2563EB] p-2 rounded-[5px] w-1/2 flex justify-center text-[#2563EB] font-bold  '
                >
                    <Link to={`${PATH_ROUTERS_CLIENT.CART}`}>
                        Vào giỏ hàng
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default NotificationModal;