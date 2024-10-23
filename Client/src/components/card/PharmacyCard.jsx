import pharmacyServices from '../../services/pharmacyService';
import { useConfirmDialog } from '../dialog/ConfirmDialogContext';
import { Button } from '../ui/button';
import AppIcons from '../../components/ui/icon';

const PharmacyCard = ({ pharmacy }) => {
  const { name, address, latitude, longitude, phone_number, opening_hours, createdAt, updatedAt } = pharmacy;
  const confirmDialog = useConfirmDialog();

  const handleDetele = async () => {
    const result = await confirmDialog({
      title: 'Xóa quầy thuốc',
      iconLeft: <AppIcons.TrashBinIcon />,
      message: `Bạn có muốn xóa ${name} không ?`,
      confirmLabel: 'Có, tôi đồng ý',
      cancelLabel: 'Không, giữ lại'
    });

    if (result) {
      await pharmacyServices.deletePharmacy(pharmacy._id);
      window.location.reload();
    }
  };

  return (
    <div className='bg-white shadow-md rounded-lg p-4 max-w-md mx-auto mb-5'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{name}</h2>
      <p className='text-gray-600 mb-2'>
        <span className='font-semibold'>Địa chỉ:</span> {address}
      </p>
      <p className='text-gray-600 mb-2'>
        <span className='font-semibold'>Tọa độ:</span> {latitude}, {longitude}
      </p>
      <p className='text-gray-600 mb-2'>
        <span className='font-semibold'>Số điện thoại:</span> {phone_number}
      </p>
      <p className='text-gray-600 mb-2'>
        <span className='font-semibold'>Giờ mở cửa:</span> {opening_hours}
      </p>
      <div className='flex items-center justify-between'>
        <Button
          rounded='s'
          outline={true}
          addClassNames='text-white bg-blue-500 border-blue-500 hover:bg-blue-600 w-[30px] h-[30px] flex items-center justify-center'
        >
          {<AppIcons.EyeIcon width='20' height='20' />}
        </Button>
        <div className='flex items-center gap-2'>
          <Button
            rounded='s'
            outline={true}
            addClassNames='text-gray-600 hover:text-teal-500 hover:border-teal-500 w-[30px] h-[30px] flex items-center justify-center'
          >
            {<AppIcons.EditIcon width='20' height='20' />}
          </Button>
          <Button
            rounded='s'
            outline={true}
            addClassNames='text-gray-600 hover:text-rose-500 hover:border-rose-500 w-[30px] h-[30px] flex items-center justify-center'
            onClick={(e) => handleDetele()}
          >
            {<AppIcons.TrashBinIcon width='20' height='20' />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
