import React, { useContext } from 'react';
import Button from '../ui/button/Button';
import formatsHelper from '../../utils/helpers/formats';
import { Image } from '../ui/image';
import AppIcons from '../../components/ui/icon';
import productServices from '../../services/productService';
import { useConfirmDialog } from '../dialog/ConfirmDialogContext';
import { ProductAdminContext } from '../../admin/product/AllProduct';

const CardProductAdmin = ({ product, addClassname, ...props }) => {
  const confirmDialog = useConfirmDialog();

  const { name, price_old, price_distcount, _id, images } = product;
  const { handleRunAfterDeleteProductItem } = useContext(ProductAdminContext);

  const handleDeleteProduct = async () => {
    const result = await confirmDialog({
      title: 'Xóa sản phẩm',
      iconLeft: <AppIcons.TrashBinIcon />,
      message: `Bạn có muốn xóa ${name} không ?`,
      confirmLabel: 'Có, tôi đồng ý',
      cancelLabel: 'Không, giữ lại'
    });

    if (result) {
      await productServices.deleteProduct(_id);
      handleRunAfterDeleteProductItem();
    }
  };

  return (
    <div className='card-product border border-solid border-gray-200 rounded overflow-hidden'>
      <Image src={images[0]?.url_img} alt={name} lazyLoad addClassNames={'h-[180px] w-full object-fill'}></Image>
      <div className='card-product-hover:bg-slate-500 p-2'>
        <h3 className='text-lg font-semibold leading-tight text-gray-900 truncate mt-2 my-3'>{name}</h3>
        <div className='flex'>
          {price_old > 0 && (
            <p className='text-gray-400 my-1 line-through text-base mr-4'>{formatsHelper.currency(price_old)}</p>
          )}
          <p className='text-indigo-400 font-semibold my-1 text-base'>{formatsHelper.currency(price_distcount)}</p>
        </div>
        <div className='flex items-center justify-between py-2 transition-colors'>
          <Button addClassNames='text-slate-600 w-9 hover:text-blue-500'>
            {<AppIcons.EyeIcon width='20' height='20' />}
          </Button>
          <div className='flex items-center gap-2'>
            <Button addClassNames={'text-slate-600 hover:text-green-500'}>
              {<AppIcons.EditIcon width='20' height='20' />}
            </Button>
            <Button addClassNames={'text-slate-600 hover:text-pink-500'} onClick={() => handleDeleteProduct()}>
              {<AppIcons.TrashBinIcon width='20' height='20' />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductAdmin;
