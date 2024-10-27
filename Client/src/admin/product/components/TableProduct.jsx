import { useContext } from 'react';
import { Image } from '../../../components/ui/image';
import AppIcons from '../../../components/ui/icon';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ProductAdminContext } from '../AllProduct';
import formatsHelper from '../../../utils/helpers/formats';

const TableProduct = ({ productData }) => {
  const navigate = useNavigate();

  const handleSwitchToEditProduct = (slug) => {
    navigate(`/admin/edit-product/${slug}`);
  };

  const handleSwitchToProductDetailsAdmin = (slug) => {
    navigate(`/admin/product-details/${slug}`);
  };

  const { handleDeleteProduct } = useContext(ProductAdminContext);

  return (
    <table className='min-w-full table-auto border-collapse'>
      <thead>
        <tr className='bg-gray-200'>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Image</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Name</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
            price_distcount
          </th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>status</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>stock</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Actions</th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {productData &&
          productData.productsList.map((product) => {
            const { name, price_distcount, _id, images, stock, slug } = product;
            return (
              <tr key={_id} className='hover:bg-gray-100'>
                <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>
                  <Image src={images[0].url_img} addClassNames='w-[50px] h-[50px] object-contain'></Image>
                </td>
                <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>{name}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {formatsHelper.currency(price_distcount)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{stock}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
                  <Button
                    size='m'
                    rounded='s'
                    addClassNames='bg-teal-500 text-white hover:bg-teal-600 px-3 py-1 rounded-md'
                    onClick={() => handleSwitchToProductDetailsAdmin(slug)}
                  >
                    <AppIcons.EyeIcon width='20' height='20' />
                  </Button>
                  <Button
                    onClick={() => handleSwitchToEditProduct(slug)}
                    size='m'
                    rounded='s'
                    addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                  >
                    <AppIcons.EditIcon width='20' height='20' />
                  </Button>
                  <Button
                    size='m'
                    rounded='s'
                    addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                    onClick={() => handleDeleteProduct(product)}
                  >
                    <AppIcons.TrashBinIcon width='20' height='20' />
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableProduct;
