
import React, { useState } from 'react';
import { DiaLog } from '../../components/dialog';
import { Button } from '../../components/ui/button';
import { InputText } from '../../components/ui/form';
import Chart from '../../components/ui/chart/Chart';

import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import reportServices from '../../services/reportService';
import AppIcons from '../../components/ui/icon/index';
import { ChartBar, ChartPie } from '../../components/ui/chart';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';


const iconMap = {
  OderIcon: <AppIcons.OderIcon width='18' height='18' />,
  ProductIcon: <AppIcons.ProductIcon width='18' height='18' />,
  CkeckIcon: <AppIcons.CkeckIcon width='18' height='18' />,
  TrashBinIcon: <AppIcons.TrashBinIcon width='18' height='18' />
};

const OrderCard = ({ title, quantity, iconName }) => {
  return (
    <div className='flex items-center justify-center text-gray-700 flex-col py-6 rounded bg-gray-100'>
      <div className=''>{iconMap[iconName]}</div>
      <div className='text-sm text-center mt-2'>
        <h3>{title}</h3>
        <p>Số lượng : {quantity}</p>
      </div>
    </div>
  );
};

const SectionOrderCurrentDate = () => {
  const { responsData: reportData } = useFetch(reportServices.getoverallReport);
  console.log(reportData);
  return (
    <div className='grid gap-4 grid-cols-2 md:grid-cols-3 mt-4'>
      {reportData &&
        reportData.length > 0 &&
        reportData.map((report) => {
          return <OrderCard {...report} key={report.title} />;
        })}
    </div>
  );
};

const SectionOrderChartWrapper = () => {
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const { responsData: reportDatasss } = useFetch(reportServices.getTopSellingProducts);
  const { responsData: MonthlyRevenue } = useFetch(reportServices.getMonthlyRevenue);

  useEffect(() => {
    if (MonthlyRevenue) {
      console.log(MonthlyRevenue);
      const { labels, revenueData } = MonthlyRevenue;
      setLabels(labels);
      setDataValues(revenueData);
    }
  }, [reportDatasss]);

  // useEffect(() => {
  //   if (reportDatasss) {
  //     console.log(reportDatasss);
  //     const topProducts = reportDatasss.topProducts;
  //     setLabels(topProducts.map((product) => product.productName));
  //     setDataValues(topProducts.map((product) => product.totalQuantity));
  //   }
  // }, [reportDatasss]);

  return (
    <div className='grid gap-4 grid-cols-1 lg:grid-cols-3 mt-4 items-center'>
      <div className='col-span-2'>
        <h2 className='text-lg text-slate-500 font-medium'>Doanh thu theo tháng</h2>
        <ChartBar labels={labels} dataValues={dataValues} title='Thống kê đơn hàng theo tháng' />
      </div>
      <div>
        <h2 className='text-lg text-slate-500 font-medium'>Top Sản Phẩm Bán Chạy</h2>
        {/* <ChartPie labels={labels} dataValues={dataValues} title='Thống kê đơn hàng theo tháng' /> */}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>

    <Chart />
      <Button onClick={() => handleOpenModal()} size='m' rounded='s' addClassNames='bg-slate-500 text-white m-5'>
        Click modal
      </Button>
      <DiaLog isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ContentLoginExample />
      </DiaLog>

      <div className='container'>
        <SectionWrapper title='Dashboard Overview' addClassNames={{ wrapper: 'mt-2' }}>
          <SectionOrderCurrentDate />
        </SectionWrapper>
        <SectionWrapper title='Report Chart' addClassNames={{ wrapper: 'mt-2' }}>
          <SectionOrderChartWrapper />
        </SectionWrapper>
      </div>

    </div>
  );
};

export default Dashboard;
