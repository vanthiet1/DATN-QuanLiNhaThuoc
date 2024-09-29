import React from 'react';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import formatsHelper from '../../utils/helpers/formats';
import { useNavigate } from 'react-router-dom';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import couponServices from '../../services/couponService';
const couponBreadCrumbs = [
  {
    path: `/dashboard`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All Coupon'
  }
];
const AllCoupon = () => {
  const { isLoading, isError, responsData: couponData, messsageError } = useFetch(couponServices.getCoupons);
  console.log(couponData);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    return <div className='text-red-500 text-center'>{messsageError}</div>;
  }

  const handleEdit = (id) => {
    console.log('Navigating to edit coupon with ID:', id);
    navigate(`/admin/edit-coupon/${id}`);
  };

  const handleDelete = async (id) => {
    await couponServices.deleteCoupon(id);
  };

  return (
    <>
      <BreadCrumb crumbsData={couponBreadCrumbs} addClassNames='my-3' />
      <div className='max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center'>All Coupon</h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Code</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Is active
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Start day
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  discount Value
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {couponData &&
                couponData.map((coupon) => (
                  <tr key={coupon._id} className='hover:bg-gray-100'>
                    <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{coupon.code}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {formatsHelper.formatDate(coupon.start_date)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {formatsHelper.formatDate(coupon.end_date)}
                    </td>
                    <td className='mr-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          coupon.is_active ? 'bg-green-100 text-green-600 border' : 'bg-red-100 text-red-600 border'
                        }`}
                      >
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {formatsHelper.currency(coupon.discount_value)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
                      <Button
                        size='m'
                        rounded='m'
                        addClassNames='bg-blue-600 text-white hover:bg-blue-500 px-3 py-1 rounded-md'
                        onClick={() => handleEdit(coupon._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='m'
                        rounded='m'
                        addClassNames='bg-red-600 text-white hover:bg-red-500 px-3 py-1 rounded-md ml-2'
                        onClick={() => handleDelete(coupon._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllCoupon;
