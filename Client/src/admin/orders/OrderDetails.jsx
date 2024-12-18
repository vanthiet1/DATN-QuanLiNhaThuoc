import React, { createContext, useContext } from 'react';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import useFetch from '../../hooks/useFetch';
import orderDetailsServices from '../../services/orderDetailsService';
import { useParams } from 'react-router-dom';
import orderServices from '../../services/orderService';
import { getResultStatus } from '../../utils/constant/common';
import formatsHelper from '../../utils/helpers/formats';
import { Button } from '../../components/ui/button';
import { generatePDF } from '../PDF/orderPdf';

const orderDetailsBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    path: `/${PATH_ROUTERS_ADMIN.ORDERS}`,
    title: 'Đơn hàng'
  },
  {
    title: 'Đơn hàng chi tiết'
  }
];

const OrderDetailsContent = () => {
  const { orderData, orderDetailsData } = useContext(OrderDetailsContext);
  return (
    <div className='p-4 rounded'>
      {orderData && (
        <>
          <div className='flex md:flex-row flex-col justify-between text-gray-700'>
            <div>
              <h1 className='font-bold text-xl uppercase mb-2'>Hóa đơn</h1>
              <span className='text-sm mt-1 text-gray-500 mr-3 capitalize'>Trạng thái</span>
              <span className='inline-flex px-2 text-sm pl-2 font-medium leading-5 capitalize rounded-full text-yellow-500 bg-yellow-100'>
                {getResultStatus(orderData.status)}
              </span>
            </div>
            <div className='lg:text-right text-left'>
              <h2 className='lg:flex lg:justify-end text-lg font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0'>
                Bình An Dược
              </h2>
              <p className='text-sm text-gray-500 mt-2'>390 Nguyễn Lương Bằng, Quận Liên Chiểu, Thành phố Đà Nẵng</p>
            </div>
          </div>
          <div className='flex lg:flex-row md:flex-row flex-col justify-between pt-4'>
            <div className='mb-3 md:mb-0 lg:mb-0 flex flex-col'>
              <span className='font-bol text-sm uppercase text-gray-600 block'>Ngày đặt đơn</span>
              <span className='text-sm text-gray-500 block'>{formatsHelper.formatDate(orderData.order_date)}</span>
            </div>
            <div className='mb-3 md:mb-0 lg:mb-0 flex flex-col'>
              <span className='font-bol text-sm uppercase text-gray-600 block'>SỐ HÓA ĐƠN</span>
              <span className='text-sm text-gray-500 block'>{orderData._id}</span>
            </div>
            <div className='flex flex-col lg:text-right text-left'>
              <span className='font-bol text-sm uppercase text-gray-600 block'>Người nhận</span>
              <span className='font-bol text-sm text-gray-600 block'>{orderData.address.receiver}</span>
              <span className='font-bol text-sm text-gray-600 block'>{orderData.address.address}</span>
              <span className='font-bol text-sm text-gray-600 block'>{orderData.address.phone}</span>
              <span className='font-bol text-sm text-gray-600 block'>{orderData.address.note}</span>
            </div>
          </div>
          <div>
            <div className='w-full overflow-hidden border border-gray-200 rounded ring-1 ring-black ring-opacity-5 my-8'>
              <div className='w-full overflow-x-auto'>
                <table className='w-full whitespace-no-wrap'>
                  <thead className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100'>
                    <tr>
                      <td className='px-4 py-3'>SR.</td>
                      <td className='px-4 py-3'>Tiêu đề sản phẩm</td>
                      <td className='px-4 py-3 text-center'>SỐ LƯỢNG</td>
                      <td className='px-4 py-3 text-center'>GIÁ SẢN PHẨM</td>
                      <td className='px-4 py-3 text-right'>Tổng tiền</td>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-100 text-gray-700 text-serif text-sm'>
                    {orderDetailsData &&
                      orderDetailsData.map((orderDetails, index) => {
                        const { _id, price, quantity, product } = orderDetails;
                        return (
                          <tr key={_id}>
                            <td className='px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left'>{index}</td>
                            <td className='px-6 py-1 whitespace-nowrap font-normal text-gray-500'>{product.name}</td>
                            <td className='px-6 py-1 whitespace-nowrap font-bold text-center'>{quantity}</td>
                            <td className='px-6 py-1 whitespace-nowrap font-bold text-center'>
                              {formatsHelper.currency(product.price_distcount)}
                            </td>
                            <td className='px-6 py-1 whitespace-nowrap text-right font-bold text-red-500'>
                              {formatsHelper.currency(price)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {orderData && (
        <div>
          <div className='flex lg:flex-row md:flex-row flex-col justify-between'>
            <div className='mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap'>
              <span className='mb-1 font-bold text-sm uppercase text-gray-600 block'>PHƯƠNG THỨC THANH TOÁN</span>
              <span className='text-sm text-gray-500 font-semibold block'>{orderData.payment.name}</span>
            </div>
            <div className='mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap'>
              <span className='mb-1 font-bold text-sm uppercase text-gray-600 block'>tổng số lượng</span>
              <span className='text-sm text-gray-500 font-semibold block'>{orderData.total_quantity}</span>
            </div>
            <div className='mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap'>
              <span className='mb-1 font-bold text-sm uppercase text-gray-600 block'>tổng giá</span>
              <span className='text-sm text-gray-500 font-semibold block'>
                {formatsHelper.currency(orderData.total_price)}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className='flex justify-end'>
        <Button
          onClick={() => generatePDF(orderData, orderDetailsData)}
          size='m'
          rounded='s'
          leftIcon={<AppIcons.PrinterIcon width='18' height='18' />}
          addClassNames='bg-slate-500 hover:bg-slate-600 text-white mt-8'
        >
          In hóa đơn
        </Button>
      </div>
    </div>
  );
};

const OrderDetailsContext = createContext();
const OrderDetailsContextProvider = ({ children }) => {
  const { id } = useParams();
  const { responsData: orderData } = useFetch(() => orderServices.getOrderById(id), {}, [id]);
  const { responsData: orderDetailsData } = useFetch(() => orderDetailsServices.getOrderDetailByOrderId(id), {}, [id]);

  return (
    <OrderDetailsContext.Provider value={{ orderData, orderDetailsData }}>{children}</OrderDetailsContext.Provider>
  );
};

const OrderDetails = () => {
  return (
    <div>
      <SectionWrapper title='Chi tiết đơn hàng' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={orderDetailsBreadCrumbs} />
        <OrderDetailsContextProvider>
          <OrderDetailsContent />
        </OrderDetailsContextProvider>
      </SectionWrapper>
    </div>
  );
};

export default OrderDetails;
