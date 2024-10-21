import React from 'react';
import { Button } from '../../components/ui/button';
import brandServices from '../../services/brandService';
import { useConfirmDialog } from '../dialog/ConfirmDialogContext';
import AppIcons from '../../components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';

function BrandCard({ brand }) {
  const { _id, name, origin_country, country_made } = brand;

  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate();

  const handleEdit = async (id) => {
    navigate(`/admin/edit-brand/${id}`);
  };

  const handleDetele = async (name) => {
    const result = await confirmDialog({
      title: 'Xóa brand',
      iconLeft: <AppIcons.TrashBinIcon />,
      message: `Bạn có muốn xóa brand ${name} không ?`,
      confirmLabel: 'Có, tôi đồng ý',
      cancelLabel: 'Không, giữ lại'
    });

    if (result) {
      await brandServices.deleteBrand(brand._id);
      window.location.reload();
    }
  };

  return (
    <tr key={_id} className='hover:bg-gray-100'>
      <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{name}</td>
      <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{origin_country}</td>
      <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{country_made}</td>
      <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
        <Button
          size='m'
          rounded='s'
          addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
          onClick={() => {
            handleEdit(_id);
          }}
        >
          <AppIcons.EditIcon width='20' height='20' />
        </Button>
        <Button
          size='m'
          rounded='s'
          addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
          onClick={() => handleDetele(name)}
        >
          <AppIcons.TrashBinIcon width='20' height='20' />
        </Button>
      </td>
    </tr>
  );
}

export default BrandCard;
