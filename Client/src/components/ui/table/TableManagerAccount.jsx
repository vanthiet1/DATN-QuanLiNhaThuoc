import { cn } from '../../../utils/helpers/mergeClasses';
import formatsHelper from '../../../utils/helpers/formats';
import SelectBox from '../form/SelectBox';
import AppIcons from '../../../components/ui/icon';
import { PATH_ROUTERS_ADMIN } from '../../../utils/constant/routers';
import BreadCrumb from '../../breadCrumb/BreadCrumb';
import { Button } from '../button';
import { UserContext } from '../../../contexts/UserContext';
import { useContext, useEffect, useState } from 'react';



const Table = ({ data, addClassNames, handleDelete, handleIsActiveAccount, roleData, handleUpdateRoleAccount,roleBreadCrumbs }) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <BreadCrumb crumbsData={roleBreadCrumbs} addClassNames='my-3' />
      <div className='max-w-7xl mx-auto bg-white shadow-md rounded-lg'>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead className='w-full'>
              <tr className='bg-gray-200 w-full'>
                <th className='w-1/6 px-4 py-3 text-left text-xs font-medium uppercase'>Tên</th>
                <th className='w-1/6 px-4 py-3 text-left text-xs font-medium uppercase'>Email</th>
                <th className='w-1/6 px-4 py-3 text-left text-xs font-medium uppercase'>Kiểu đăng nhập</th>
                <th className='w-1/6 px-4 py-3 text-left text-xs font-medium uppercase'>Xác thực</th>
                <th className='w-1/12 px-4 py-3 text-left text-xs font-medium uppercase'>Trạng thái</th>
                <th className='w-1/6 px-4 py-3 text-left text-xs font-medium uppercase'>Tạo</th>
                <th className='w-1/6 px-4 py-3 text-left text-xs font-medium uppercase'>Quyền</th>
                <th className='w-1/6 px-4 py-3 text-left text-xs font-medium uppercase'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 '>
              {data?.map((item) => (
                <tr key={item._id} className='hover:bg-gray-100 px-6'>
                  <td className='flex items-center p-4'>
                    <img
                      src={
                        item?.avatar ||
                        'https://res.cloudinary.com/dz93cdipw/image/upload/v1713866997/Book-Store/Avatar/kwuemqemetzsp4jw21mt.webp'
                      }
                      className='w-10 h-10 object-cover rounded-full mr-3'
                      alt='Avatar'
                    />
                    <span className='text-sm font-medium text-gray-800'>{item?.fullname}</span>
                  </td>
                  <td className='p-4 truncate text-sm text-gray-600'>{item?.email}</td>
                  <td className='p-4 truncate text-sm text-gray-600'>{item?.provider}</td>
                  <td className='p-4'>
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full text-center w-24 justify-center
                      ${item?.emailVerify ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {item?.emailVerify ? 'Verified' : 'Not Verified'}
                    </span>
                  </td>
                  <td className='p-4'>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full 
                      ${item?.is_active === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {item?.is_active === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className='p-4 text-sm text-gray-600'>{formatsHelper.formatDate(item?.createdAt)}</td>
                  <td className='p-4 truncate text-sm text-gray-600'>{item?.role_id?.role_Name}</td>
                  <td className='p-4 flex gap-2'>
                    {user?.role_id?.role_Name !== 'staff' && (
                      <>
                        <SelectBox
                          onChange={(e) => handleUpdateRoleAccount(item._id, e.target.value)}
                          optionData={roleData}
                          size='m'
                          rounded='m'
                          defaultValue={item?.role_id?._id || ''}
                        />
                        <Button
                          size='m'
                          rounded='s'
                          addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                          onClick={() => handleDelete(item._id)}
                        >
                          <AppIcons.TrashBinIcon width='20' height='20' />
                        </Button>
                      </>
                    )}
                    {item?.role_id?.role_Name !== 'admin' && user?.role_id?.role_Name !== item?.role_id?.role_Name && (
                      <Button
                        size='s'
                        className={`px-3 py-1 rounded-md ${
                          item?.is_active === 1
                            ? 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                            : 'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                        }`}
                        onClick={() => handleIsActiveAccount(item._id)}
                      >
                        {item?.is_active === 1 ? 'Khóa' : 'Mở'}
                      </Button>
                    )}
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

export default Table;
