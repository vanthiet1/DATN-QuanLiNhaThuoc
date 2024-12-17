import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import brandServices from '../../services/brandService';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper.jsx';
import { useNavigate } from 'react-router-dom';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext.jsx';
import Button from '../../components/ui/button/Button.jsx';

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
  const [brandData, setBrandData] = useState([]);
  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate();
  const { isLoading, isError, responsData: initialBrandData, messsageError } = useFetch(brandServices.getBrand);

  useEffect(() => {
    if (initialBrandData) {
      setBrandData(initialBrandData);
    }
  }, [initialBrandData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{messsageError}</div>;
  }

  const handleEdit = async (id) => {
    navigate(`/admin/edit-brand/${id}`);
  };

  const handleDetele = async (brand) => {
    const result = await confirmDialog({
      title: 'Xóa brand',
      iconLeft: <AppIcons.TrashBinIcon />,
      message: `Bạn có muốn xóa brand ${brand.name} không ?`,
      confirmLabel: 'Có, tôi đồng ý',
      cancelLabel: 'Không, giữ lại'
    });

    if (result) {
      const brandRestulDelete = await brandServices.deleteBrand(brand._id);
      if (brandRestulDelete) {
        setBrandData(brandData.filter((item) => item._id !== brand._id));
      }
    }

    return (
      <SectionWrapper title='Brand all' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={brandBreadCrumb} addClassNames='my-3' />
        <div className=''>
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
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                    action
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 '>
                {brandData &&
                  brandData.map((brand, index) => {
                    const { _id, name, origin_country, country_made } = brand;
                    return (
                      <tr key={_id} className='hover:bg-gray-100'>
                        <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{name}</td>
                        <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {origin_country}
                        </td>
                        <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {country_made}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
                          <Button
                            size='m'
                            rounded='m'
                            addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                            onClick={() => handleEdit(_id)}
                          >
                            <AppIcons.EditIcon width='18' height='18' />
                          </Button>
                          <Button
                            size='m'
                            rounded='m'
                            addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                            onClick={() => handleDetele(brand)}
                          >
                            <AppIcons.TrashBinIcon width='18' height='18' />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>
    );
  };
};
export default AllBrand;
