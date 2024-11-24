import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import formatsHelper from '../../utils/helpers/formats';
import { useNavigate } from 'react-router-dom';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import couponServices from '../../services/couponService';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper.jsx';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers.js';

const couponBreadCrumbs = [
  {
    path: PATH_ROUTERS_ADMIN.DASHBOARD,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All Coupon'
  }
];

const AllCoupon = () => {
  const { isLoading, isError, responsData: initialCouponData, messsageError } = useFetch(couponServices.getCoupons);

  const [couponData, setCouponData] = useState([]);
  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialCouponData) {
      setCouponData(initialCouponData);
    }
  }, [initialCouponData]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-coupon/${id}`);
  };

  const handleDelete = async (id, name) => {
    try {
      const result = await confirmDialog({
        title: 'Xóa Coupon',
        iconLeft: <AppIcons.TrashBinIcon />,
        message: `Bạn có muốn xóa ${name} không ?`,
        confirmLabel: 'Có, tôi đồng ý',
        cancelLabel: 'Không, giữ lại'
      });
      if (result) {
        await couponServices.deleteCoupon(id);

        setCouponData(couponData.filter((coupon) => coupon._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete coupon:', error);
    }
  };

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

  return (
    <>
      <SectionWrapper title='Coupon all' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={couponBreadCrumbs} addClassNames='my-3' />
        <div className=''>
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto border-collapse'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                    Code
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                    Start day
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                    End day
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                    Discount Value
                  </th>
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
                      <td className='px-6 py-4'>
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
                          addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                          onClick={() => handleEdit(coupon._id)}
                        >
                          <AppIcons.EditIcon width='18' height='18' />
                        </Button>
                        <Button
                          size='m'
                          rounded='m'
                          addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                          onClick={() => handleDelete(coupon._id, coupon.code)}
                        >
                          <AppIcons.TrashBinIcon width='18' height='18' />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default AllCoupon;
