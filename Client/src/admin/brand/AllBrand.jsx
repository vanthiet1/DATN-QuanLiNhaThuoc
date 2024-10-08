import React from 'react';
import useFetch from '../../hooks/useFetch';
import brandServices from '../../services/brandService';
import BrandCard from '../../components/card/BrandCard';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';

const brandBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All Brand'
  }
];

const AllBrand = () => {
  const { isLoading, isError, responsData: brandData, messsageError } = useFetch(brandServices.getBrand);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{messsageError}</div>;
  }

  return (
    <>
      <BreadCrumb crumbsData={brandBreadCrumb} addClassNames='my-3' />
      <div className='max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center'>All thương hiệu</h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead className='w-full'>
              <tr className='bg-gray-200 w-full'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Tên thương hiệu
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Nước xuất xứ
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Quốc gia sản xuất
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>action</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 '>
              {brandData &&
                brandData.map((brand,index) => {
                  return <BrandCard brand={brand} key={index} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllBrand;
