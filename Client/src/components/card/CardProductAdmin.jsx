import React, { useContext } from 'react';
import Button from '../ui/button/Button';
import formatsHelper from '../../utils/helpers/formats';
import { Image } from '../ui/image';
import AppIcons from '../../components/ui/icon';
import { ProductAdminContext } from '../../admin/product/AllProduct';
import { useNavigate } from 'react-router-dom';

const imageSrcDefault =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyODggMTgwIiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjE4MCI+CiAgPHJlY3Qgd2lkdGg9IjI4OCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNEQURBREFGRiI+PC9yZWN0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI2cHgiIGZpbGw9IiM0MDQwNDRGRiI+Tm8gSW1hZ2U8L3RleHQ+ICAgCjwvc3ZnPg==';

const CardProductAdmin = ({ product, addClassname }) => {
  const { name, price_old, price_distcount, images, slug } = product;
  const { handleDeleteProduct } = useContext(ProductAdminContext);
  const navigate = useNavigate();

  const handleSwitchToEditProduct = () => {
    navigate(`/admin/edit-product/${slug}`);
  };

  const handleSwitchToProductDetailsAdmin = () => {
    navigate(`/admin/product-details/${slug}`);
  };

  return (
    <div className={`card-product border border-solid border-gray-200 rounded overflow-hidden ${addClassname}`}>
      <Image
        src={images[0]?.url_img}
        alt={name}
        fallbackSrc={imageSrcDefault}
        lazyLoad
        addClassNames={'h-[180px] w-full object-fill'}
      ></Image>
      <div className='card-product-hover:bg-gray-500 p-2'>
        <h3 className='font-semibold leading-tight min-h-[40px] text-gray-700 line-clamp-2 mt-2 my-3'>{name}</h3>
        <div className='flex'>
          {price_old > 0 && (
            <p className='text-gray-400 my-1 line-through text-sm mr-4'>{formatsHelper.currency(price_old)}</p>
          )}
          <p className='text-indigo-500 font-semibold my-1 text-sm'>{formatsHelper.currency(price_distcount)}</p>
        </div>
        <div className='flex items-center justify-between py-2 transition-colors'>
          <Button
            addClassNames='text-white bg-blue-500 border-blue-500 hover:bg-blue-600 w-[30px] h-[30px] flex items-center justify-center'
            rounded='s'
            outline={true}
            onClick={() => handleSwitchToProductDetailsAdmin()}
          >
            <AppIcons.EyeIcon width='20' height='20' />
          </Button>
          <div className='flex items-center gap-2'>
            <Button
              addClassNames={
                'text-gray-600 hover:text-teal-500 hover:border-teal-500 w-[30px] h-[30px] flex items-center justify-center'
              }
              rounded='s'
              outline={true}
              onClick={() => handleSwitchToEditProduct()}
            >
              {<AppIcons.EditIcon width='20' height='20' />}
            </Button>
            <Button
              addClassNames={
                'text-gray-600 hover:text-rose-500 hover:border-rose-500 w-[30px] h-[30px] flex items-center justify-center'
              }
              rounded='s'
              outline={true}
              onClick={() => handleDeleteProduct(product)}
            >
              {<AppIcons.TrashBinIcon width='20' height='20' />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductAdmin;
