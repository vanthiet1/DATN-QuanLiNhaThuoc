import useFetch from '../../../hooks/useFetch';
import paymentMethodServices from '../../../services/paymentMethodService';
import { useCartFormContext } from './context/CartFormProvider';
import { InputRadio, ErrorMessage } from '../../../components/ui/form';
import { Image } from '../../../components/ui/image';

const PaymentMethod = () => {
  const { responsData: paymentMethodData } = useFetch(paymentMethodServices.getAllPaymentMethod, {}, []);
  const { register, errors } = useCartFormContext();

  return (
    <div>
      <h2 className='text-lg font-medium text-gray-700 mb-4'>Phương thức thanh toán</h2>
      <div>
        {paymentMethodData &&
          paymentMethodData.length > 0 &&
          paymentMethodData.map((paymentMethod) => {
            const { name, image, _id } = paymentMethod;
            return (
              <label htmlFor={_id} key={_id} className='cursor-pointer'>
                <div className='card-payMethod flex items-center gap-3 mb-3'>
                  <InputRadio id={_id} refinput={register('payment_method_id')} defaultValue={_id} />
                  <Image src={image} width='36px' height='36px' alt={_id} />
                  <span>{name}</span>
                </div>
              </label>
            );
          })}
          <div className='mb-4'>
          {errors.payment_method_id && <ErrorMessage  messsage={errors.payment_method_id.message}></ErrorMessage>}
          </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
