import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import formatsHelper from '../../utils/helpers/formats';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import bannerServices from '../../services/bannerService';
import { useNavigate } from 'react-router-dom';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';

const bannerBreadCrumbs = [
  {
    path: `/dashboard`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All Banner'
  }
];

const AllBanner = () => {
  const { isLoading, isError, responsData: initialBannerData, messsageError } = useFetch(bannerServices.getAllBanner);

  const [bannerData, setBannerData] = useState([]);
  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialBannerData) {
      setBannerData(initialBannerData);
    }
  }, [initialBannerData]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-banner/${id}`);
  };

  const handleDelete = async (id, name) => {
    try {
      const result = await confirmDialog({
        title: 'Xóa Banner',
        iconLeft: <AppIcons.TrashBinIcon />,
        message: `Bạn có muốn xóa ${name} không ?`,
        confirmLabel: 'Có, tôi đồng ý',
        cancelLabel: 'Không, giữ lại'
      });
      if (result) {
        await bannerServices.deleteBannerById(id);

        setBannerData(bannerData.filter((banner) => banner._id !== id));
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
      <BreadCrumb crumbsData={bannerBreadCrumbs} addClassNames='my-3' />
      <div className='max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg'>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Img</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {bannerData &&
                bannerData.map((banner) => (
                  <tr key={banner._id} className='hover:bg-gray-100'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <img src={banner.url_img} alt={banner.name} className="w-25 h-14"/>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{banner.name}</td>

                    <td className='px-6 py-4 whitespace-nowrap text-sm flex mt-3'>
                      <Button
                        size='m'
                        rounded='s'
                        addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                        onClick={() => {
                          handleEdit(banner._id);
                        }}
                      >
                        <AppIcons.EditIcon width='20' height='20' />
                      </Button>
                      <Button
                        size='m'
                        rounded='s'
                        addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                        onClick={() => handleDelete(banner._id, banner.name)}
                      >
                        <AppIcons.TrashBinIcon width='20' height='20' />
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

export default AllBanner;