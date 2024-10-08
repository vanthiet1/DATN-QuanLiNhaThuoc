import React from 'react';
import AppIcons from '../../../components/ui/icon';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import formatsHelper from '../../../utils/helpers/formats';
import { getResultStatus } from '../../../utils/constant/common';

const TableOrders = ({ data: orderData }) => {
  const navigate = useNavigate();

  const handleSwitchOrdersDetails = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  return (
    <div className='mt-6'>
      <table className='min-w-full table-auto border-collapse'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Status</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              User name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Order time
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Total price
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Total quantity
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Sale type
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>action</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {orderData &&
            orderData.map((order) => {
              const { status, user, total_price, total_quantity, _id, order_date, sale_type } = order;
              return (
                <tr key={_id} className='hover:bg-gray-100'>
                  <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>
                    {getResultStatus(status)}
                  </td>
                  <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>{user.fullname}</td>
                  <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>
                    {formatsHelper.formatDate(order_date)}
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {formatsHelper.currency(total_price)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{total_quantity}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {sale_type === 'off' ? 'Quầy thuốc' : 'Website'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
                    <Button
                      onClick={() => handleSwitchOrdersDetails(_id)}
                      size='m'
                      rounded='s'
                      addClassNames='bg-teal-500 text-white hover:bg-teal-600 px-3 py-1 rounded-md'
                    >
                      <AppIcons.EyeIcon width='20' height='20' />
                    </Button>
                    <Button
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
                    >
                      <AppIcons.TrashBinIcon width='20' height='20' />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrders;
