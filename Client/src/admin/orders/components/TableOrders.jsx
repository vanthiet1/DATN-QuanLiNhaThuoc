import React, { useContext, useEffect, useState } from 'react';
import AppIcons from '../../../components/ui/icon';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import formatsHelper from '../../../utils/helpers/formats';
import { getResultStatus } from '../../../utils/constant/common';
import { SelectBox } from '../../../components/ui/form';
import { OrdersContext } from '../Orders';

const TableOrders = ({ data: orderData }) => {
  const [statusOrderSeleceted, setStatusOrderSeleceted] = useState([]);
  const navigate = useNavigate();
  const { handleChangeStatusOrder, tableRef } = useContext(OrdersContext);

  const handleSwitchOrdersDetails = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  useEffect(() => {
    const convertStatusOrder = [1, 2, 3, 4, 5].map((statusOrder) => {
      return { title: getResultStatus(statusOrder), value: `${statusOrder}` };
    });
    setStatusOrderSeleceted(convertStatusOrder);
  }, [orderData]);

  return (
    <div className='mt-6'>
      <table className='min-w-full table-auto border-collapse' ref={tableRef}>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>STT</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Trạng thái</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Tên
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Thời gian
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Tổng tiền
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Tổng SL
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Pay</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Kiểu bán
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>action</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {orderData &&
            orderData.map((order, index) => {
              const { status, user, total_price, total_quantity, _id, order_date, isPay, sale_type } = order;
              return (
                <tr key={_id} className='hover:bg-gray-100'>
                  <td className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                    {index + 1}
                  </td>
                  <td className='px-6 py-3 whitespace-nowrap text-xs font-medium text-gray-700'>
                    {statusOrderSeleceted.length > 0 && (
                      <SelectBox
                        optionData={statusOrderSeleceted}
                        defaultValue={status}
                        addClassNames='w-fit'
                        rounded='full'
                        onChange={(e) => handleChangeStatusOrder(_id, e.target.value, status)}
                      ></SelectBox>
                    )}
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
                    {isPay ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </td>
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
                    {/* <Button
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
                      </Button> */}
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
