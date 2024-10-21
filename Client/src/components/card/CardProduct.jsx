import { Button } from '../ui/button';
import AppIcons from '../../components/ui/icon/index';
import { Link } from 'react-router-dom';
import cartServices from '../../services/cartService';
import { showToastError, showToastSuccess } from '../../configs/toastConfig';
const CardProduct = ({ productId, image, name, priceNew, priceOld, detail, description_short, userId }) => {
//   const handleAddToCart = async () => {
//     const productData = {
//       userId,
//       products: [{ productId, quantity: 1 }] // Ensure productId is included here
//     };
//     console.log(userId);

//     try {
//       const response = await cartServices.addToCart(productData);
//       if (response) {
//         showToastSuccess('Thêm sản phẩm vào giỏ hàng thành công!');
//       } else {
//         showToastError('Có lỗi xảy ra, không thể thêm sản phẩm vào giỏ hàng.');
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       showToastError('Có lỗi xảy ra, không thể thêm sản phẩm vào giỏ hàng.');
//     }
//   };

  return (
    <div className='w-full shadow-2xl rounded-[10px] grid grid-rows-[auto,1fr]'>
      <Link to={`${detail}`}>
        <img className='w-full rounded-tl-[10px] rounded-tr-[10px] h-[250px]' src={image} alt='' />
        <div className='p-3 grid grid-rows-[auto,1fr,auto]'>
          <span>{name}</span>
          <p className='truncate'>{description_short}</p>
          <div className='flex gap-2 py-3'>
            <span className='block'>{priceNew}</span>
            <span className='block line-through text-gray-400'>{priceOld}</span>
          </div>
        </div>
      </Link>
      <div className='flex justify-between items-center px-3 pb-3 h-max'>
        <Button
          addClassNames={'w-full p-2 px-[25px] bg-[#2563eb] text-[15px] rounded-[30px] w-max text-[#fff]'}
        //   onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
          <AppIcons.OderIcon />
        </Button>
      </div>
    </div>
  );
};

export default CardProduct;
