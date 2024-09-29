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
    <div className='bg-white shadow-md rounded-lg p-6 max-w-md mx-auto my-5'>
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
        <Button size='m' rounded='m' addClassNames='bg-slate-800 text-white'>
          xem
        </Button>
        <div className='flex items-center gap-2'>
          <Button size='m' rounded='m' addClassNames='bg-slate-800 text-white'>
            sửa
          </Button>
          <Button size='m' rounded='m' addClassNames='bg-slate-800 text-white' onClick={(e) => handleDetele()}>
            xóa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
