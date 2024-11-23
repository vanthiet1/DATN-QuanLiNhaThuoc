import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import AppIcons from '../../components/ui/icon/index';
import formatsHelper from '../../utils/helpers/formats';

const CardProduct = ({ products, handleAddToCart }) => {
  if (!products) return null;

  return (
    <div className='w-full shadow-xl rounded-[10px] grid grid-rows-[auto,1fr]' key={products?._id}>
      <Link to={`/product/${products?.slug}`}>
        <img
          className='w-full rounded-tl-[10px] rounded-tr-[10px] h-[300px] object-cover transform transition-transform duration-300 hover:scale-90'
          src={products?.images?.[0]?.url_img}
          alt={products?.name}
        />

        <div className='p-3 grid grid-rows-[auto,1fr,auto]'>
          <span className='truncate font-semibold'>{products?.name}</span>
          <p className='truncate'>{products?.description_short}</p>
          <div className='flex gap-2 py-3'>
            <span className='block'>{formatsHelper.currency(products?.price_distcount)}</span>
            <span className='block line-through text-gray-400'>{formatsHelper.currency(products?.price_old)}</span>
          </div>
        </div>
      </Link>
      <div className='flex justify-between items-center px-3 pb-3 h-max'>
        <Button
          addClassNames={'w-full p-2 px-[25px] bg-[#2563eb] text-[15px] rounded-[30px] text-[#fff] flex justify-center'}
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
          <AppIcons.OderIcon width='18' height='18' />
        </Button>
      </div>
    </div>
  );
};
export default CardProduct;
