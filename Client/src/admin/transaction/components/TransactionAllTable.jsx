import React from 'react';
import { Button } from '../../../components/ui/button';
import AppIcons from '../../../components/ui/icon';
import formatsHelper from '../../../utils/helpers/formats';

const TransactionAllTable = ({ data: transactionData }) => {
  return (
    <div>
      <table className='min-w-full table-auto border-collapse'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
             ID giao dịch
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Kiểu giao dịch
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Tổng tiền giao dịch</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Mã trả về
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>ID đơn hàng</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
              Ngày mua
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {transactionData &&
            transactionData.map((transaction) => {
              const { transaction_id, transaction_type, response_code, _id, amount, order_id, createdAt } = transaction;
              return (
                <tr key={_id} className='hover:bg-gray-100'>
                  <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>{transaction_id}</td>
                  <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>{transaction_type}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {formatsHelper.currency(amount)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{response_code}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{order_id?._id}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 '>{createdAt}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionAllTable;
