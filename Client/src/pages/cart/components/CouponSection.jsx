import { InputRadio } from '../../../components/ui/form';
import useFetch from '../../../hooks/useFetch';
import couponServices from '../../../services/couponService';
import { useCartFormContext } from './context/CartFormProvider';
import formatsHelper from '../../../utils/helpers/formats';
import { uesCheckOutContext } from './context/CheckOutProvider';

const CouponSection = () => {
  const { register } = useCartFormContext();
  const { responsData: couponsData } = useFetch(couponServices.getCouponsActive, {}, []);
  const { handleApplyCoupon } = uesCheckOutContext();

  return (
    <div className='max-h-[200px] overflow-y-auto'>
      <h2 className='text-lg font-medium text-gray-700 mb-4'>Sử dụng mã giảm giá</h2>
      <div>
        {couponsData &&
          couponsData.length > 0 &&
          couponsData.map((coupon) => {
            const { _id, code, discount_value } = coupon;
            return (
              <label htmlFor={_id} key={_id}>
                <div className='flex items-center gap-3 mb-3 '>
                  <InputRadio
                    refinput={register('coupon_id')}
                    id={_id}
                    defaultValue={_id}
                    onChange={(e) => handleApplyCoupon(e, discount_value)}
                  />
                  <p>nhập mã {code}</p>
                  <span>Giảm {formatsHelper.currency(discount_value)}</span>
                </div>
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default CouponSection;
