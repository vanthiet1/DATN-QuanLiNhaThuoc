import { Image } from '../../../components/ui/image';
import { useContext, useEffect } from 'react';
import { CartOrderOffContext } from '../context/CartOrderOffProvider';
import { Button } from '../../../components/ui/button';
import formatsHelper from '../../../utils/helpers/formats';

const CartDetailsShow = () => {
  const { removeItemProductInCart, cartData, cartTotalPrice, cartQuanity } = useContext(CartOrderOffContext);

  const handleChangeQuanity = (number) => {
    console.log(number);
  };

  useEffect(() => {}, [cartData]);

  return (
    <div className='cart-wrapper border border-solid border-gray-300 p-4 rounded-md'>
      {!cartData.length && (
        <div className='h-[200px] w-full flex items-center justify-center'>Hiện Không có sản phẩm trong giỏ hàng</div>
      )}
      <div>
        {cartData.length > 0 &&
          cartData.map((product) => {
            const { name, productId, quantity, totalPrice, image } = product;
            return (
              <div className='card-item-cart flex gap-3 mb-3' key={productId}>
                <div>
                  <Image src={image} addClassNames='w-[100px] h-[100px]' alt={name} />
                </div>
                <div>
                  <h3>{name}</h3>
                  <p>Tổng tiền: {totalPrice}</p>
                  <p>Số lượng: {quantity}</p>
                  <input
                    type='text'
                    defaultValue={quantity}
                    onChange={(e) => handleChangeQuanity(e.target.value)}
                  ></input>
                </div>
                <Button onClick={() => removeItemProductInCart({ _id: productId })}>xóa</Button>
              </div>
            );
          })}
        {cartData.length > 0 && (
          <div className='flex flex-col gap-2'>
            <span className='text-sm text-gray-600'>Tổng tiền: {formatsHelper.currency(cartTotalPrice)}</span>
            <span className='text-sm text-gray-600'>Tổng số lượng: {cartQuanity}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetailsShow;
