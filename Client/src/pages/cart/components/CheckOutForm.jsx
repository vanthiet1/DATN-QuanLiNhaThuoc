import { InputText, SelectBox } from '../../../components/ui/form';
import TextArea from '../../../components/ui/form/Textarea';

const CheckoutForm = () => (
  <div className='space-y-6 border-t py-6'>
    <div>
      <h2 className='font-bold mb-4'>Thông tin người đặt</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputText size='l' rounded='s' placeholder='Họ và tên người đặt'/>
        <InputText size='l' rounded='s' placeholder='Số điện thoại'/>
        <InputText size='l' rounded='s' placeholder='Email (không bắt buộc)' addClassNames='md:col-span-2' />
      </div>
    </div>

    <div>
      <h2 className='font-bold mb-4'>Địa chỉ nhận hàng</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputText size='l' rounded='s' placeholder='Họ và tên người nhận' />
        <InputText size='l' rounded='s' placeholder='Số điện thoại' />
        <SelectBox size='l' rounded='s' optionData={[]}>
          <option>Chọn tỉnh / thành phố</option>
        </SelectBox>
        <SelectBox size='l' rounded='s' optionData={[]}>
          <option>Chọn quận / huyện</option>
        </SelectBox>
        <SelectBox size='l' rounded='s' optionData={[]} addClassNames='md:col-span-2'>
          <option>Chọn xã / phường</option>
        </SelectBox>
        <InputText size='l' rounded='s' placeholder='Chọn địa chỉ cụ thể' addClassNames='border p-2 md:col-span-2' />
        <TextArea placeholder='Ghi chú' rounded='s' addClassNames='md:col-span-2' />
      </div>
    </div>
  </div>
);

export default CheckoutForm;
