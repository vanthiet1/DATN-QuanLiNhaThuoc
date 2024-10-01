import React, { useContext } from 'react';
import Button from '../ui/button/Button';
import formatsHelper from '../../utils/helpers/formats';
import { Image } from '../ui/image';
import AppIcons from '../../components/ui/icon';
import productServices from '../../services/productService';
import { useConfirmDialog } from '../dialog/ConfirmDialogContext';
import { ProductAdminContext } from '../../admin/product/AllProduct';

const imageSrcDefault =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyODggMTgwIiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjE4MCI+CiAgPHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNEQURBREFGRiI+PC9yZWN0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI2cHgiIGZpbGw9IiM0MDQwNDRGRiI+Tm8gSW1hZ2U8L3RleHQ+ICAgCjwvc3ZnPg==';

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
      <Image
        src={images[0]?.url_img}
        alt={name}
        fallbackSrc={imageSrcDefault}
        lazyLoad
        addClassNames={'h-[180px] w-full object-fill'}
      ></Image>
      <div className='card-product-hover:bg-gray-500 p-2'>
        <h3 className='font-semibold leading-tight text-gray-700 line-clamp-2 mt-2 my-3'>{name}</h3>
        <div className='flex'>
          {price_old > 0 && (
            <p className='text-gray-400 my-1 line-through text-sm mr-4'>{formatsHelper.currency(price_old)}</p>
          )}
          <p className='text-indigo-500 font-semibold my-1 text-sm'>{formatsHelper.currency(price_distcount)}</p>
        </div>
        <div className='flex items-center justify-between py-2 transition-colors'>
          <Button addClassNames='text-gray-600 w-9 hover:text-blue-500'>
            {<AppIcons.EyeIcon width='20' height='20' />}
          </Button>
          <div className='flex items-center gap-2'>
            <Button addClassNames={'text-gray-600 hover:text-teal-500'}>
              {<AppIcons.EditIcon width='20' height='20' />}
            </Button>
            <Button addClassNames={'text-gray-600 hover:text-rose-500'} onClick={() => handleDeleteProduct()}>
              {<AppIcons.TrashBinIcon width='20' height='20' />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductAdmin;
