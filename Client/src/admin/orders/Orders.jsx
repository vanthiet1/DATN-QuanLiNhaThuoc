import React, { createContext, useContext, useRef, useState } from 'react';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import TableOrders from './components/TableOrders';
import useFetch from '../../hooks/useFetch';
import orderServices from '../../services/orderService';
import { InputDate, InputText, SelectBox } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import PaginatedItems from '../../components/paginate/Paginate';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import { handleExportExeclWithTableAdmin } from '../../utils/helpers/handleExportExecl';

const OrderBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Order'
  }
];

export const OrdersContext = createContext();

const OrdersContextProvider = ({ children }) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [numberPage, setNumeberPage] = useState(1);
  const [isLoadingUpdate, setIsLoadingUpDate] = useState('ide');
  const confirmDialog = useConfirmDialog();
  const tableRef = useRef();

  const {
    isLoading,
    isError,
    messageError,
    responsData: orderDataResponsive
  } = useFetch(() => orderServices.getAllOrders(`?page=${numberPage}&${orderQuery}&limit=10`), {}, [
    numberPage,
    orderQuery,
    isLoadingUpdate
  ]);

  const handleChangeNumberPage = (number) => {
    setNumeberPage(number);
  };

  const handleSearchOder = (customerFullName, orderStatus, orderStartDate, orderEndDate, saleType) => {
    setOrderQuery(
      `customerName=${customerFullName}&status=${orderStatus}&startDate=${orderStartDate}&endDate=${orderEndDate}&saleType=${saleType}`
    );
  };

  const handleChangeStatusOrder = async (orderId, statusValue) => {
    const result = await confirmDialog({
      title: 'Cập nhật đơn hàng',
      iconLeft: <AppIcons.ProductIcon />,
      message: `xác nhận cập nhật đơn hàng!`,
      confirmLabel: 'Có, tôi đồng ý',
      cancelLabel: 'Không, giữ lại'
    });
    if (result) {
      setIsLoadingUpDate(true);
      await orderServices.updateOrder(orderId, { status: statusValue });
      setIsLoadingUpDate(false);
    }
  };

  const handleExportOrderToExcel = () => {
    if (orderDataResponsive) {
      const tableElement = tableRef.current;
      handleExportExeclWithTableAdmin(tableElement, `binh-an-duoc-don-hang-${new Date()}`);
    }
  };

  if (isError) {
    return <div>{messageError}</div>;
  }

  return (
    <OrdersContext.Provider
      value={{
        orderDataResponsive,
        isLoading,
        handleChangeNumberPage,
        handleSearchOder,
        handleChangeStatusOrder,
        handleExportOrderToExcel,
        tableRef
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

const statusOrderSelectedDefault = [
  {
    title: ' Đang chờ xử lý',
    value: '1'
  },
  {
    title: ' Đã xác nhận',
    value: '2'
  },
  {
    title: ' Đang giao hàng',
    value: '3'
  },
  {
    title: ' Đã hoàn thành',
    value: '4'
  },
  {
    title: ' Đã hủy',
    value: '5'
  }
];

const saleTypeSelectedDefault = [
  {
    title: 'Tất cả',
    value: 'all'
  },
  {
    title: 'Bán tại quầy thuốc',
    value: 'off'
  },
  {
    title: 'Bán trên website',
    value: 'online'
  }
];

const HeaderOrder = () => {
  const [customerFullName, setCustomerFullName] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [orderStartDate, setOrderStartDate] = useState('');
  const [orderEndDate, setOrderEndDate] = useState('');
  const [saleType, setSaleType] = useState('');

  const { handleSearchOder, handleExportOrderToExcel } = useContext(OrdersContext);

  return (
    <div className='p-4 bg-gray-100 mt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='flex flex-col'>
          <label htmlFor='' className='mb-1 text-slate-700'>
            User name
          </label>
          <InputText
            size='m'
            rounded='s'
            placeholder='Nguyễn Văn Vinh'
            onChange={(e) => setCustomerFullName(e.target.value)}
          ></InputText>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='' className='mb-1 text-slate-700'>
            Select Status
          </label>

          <SelectBox
            optionData={statusOrderSelectedDefault}
            onChange={(e) => setOrderStatus(e.target.value)}
            size='m'
            rounded='s'
          ></SelectBox>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='' className='mb-1 text-slate-700'>
            Start Date
          </label>
          <InputDate size='m' rounded='s' onChange={(e) => setOrderStartDate(e.target.value)}></InputDate>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='' className='mb-1 text-slate-700'>
            End Date
          </label>
          <InputDate size='m' rounded='s' onChange={(e) => setOrderEndDate(e.target.value)}></InputDate>
        </div>
        <div className='flex flex-col'>
          <SelectBox
            optionData={saleTypeSelectedDefault}
            size='m'
            rounded='s'
            onChange={(e) => setSaleType(e.target.value)}
          ></SelectBox>
        </div>
        <div className='flex items-center justify-between'>
          <Button
            onClick={() => handleSearchOder(customerFullName, orderStatus, orderStartDate, orderEndDate, saleType)}
            size='m'
            rounded='s'
            leftIcon={<AppIcons.SearchIcons width='18' height='18' />}
            addClassNames='bg-gray-500 text-white flex items-center hover:bg-gray-600 w-full justify-center'
          >
            Search order
          </Button>
        </div>
        <div className='flex items-center justify-end col-span-2'>
          <Button
            onClick={() => handleExportOrderToExcel()}
            size='m'
            rounded='s'
            leftIcon={<AppIcons.ArrowDownIcon width='18' height='18' />}
            addClassNames='bg-gray-500 text-white flex items-center hover:bg-gray-600 justify-center w-fit'
          >
            Export to excel
          </Button>
        </div>
      </div>
    </div>
  );
};

const ShowOdersWrapper = () => {
  const { orderDataResponsive, isLoading, handleChangeNumberPage } = useContext(OrdersContext);

  return (
    <div>
      {isLoading && <div>loadding ...</div>}
      {orderDataResponsive && <TableOrders data={orderDataResponsive.ordersData} />}
      <div>
        {orderDataResponsive && orderDataResponsive.ordersData.length && (
          <PaginatedItems
            totalNumberPage={orderDataResponsive.totalNumberPage}
            setNumberPage={handleChangeNumberPage}
          />
        )}
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div>
      <SectionWrapper title='Order' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={OrderBreadCrumbs}></BreadCrumb>
        <OrdersContextProvider>
          <HeaderOrder />
          <ShowOdersWrapper />
        </OrdersContextProvider>
      </SectionWrapper>
    </div>
  );
};

export default Orders;
