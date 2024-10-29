import { cn } from '../../../utils/helpers/mergeClasses';
import formatsHelper from '../../../utils/helpers/formats';
import SelectBox from '../form/SelectBox';
import { Button } from '../button';
import AppIcons from '../../ui/icon';

const Table = ({
  data,
  addClassNames,
  titleRow,
  cols,
  styleRows,
  handleDelete,
  handleIsActiveAccount,
  roleData,
  handleUpdateRoleAccount
}) => {
  return (
    <table className={cn(`min-w-full table-auto border-collapse${addClassNames}`)}>
      <thead className='w-full'>
        <tr className={cn(`bg-gray-200 `)}>
          {titleRow &&
            titleRow.map((title, index) => (
              <th
                key={index}
                className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'
              >
                {title}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((data) => (
            <tr key={data._id} className=' hover:bg-gray-100'>
              <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>
                <img
                  src={
                    data?.avatar ||
                    'https://res.cloudinary.com/dz93cdipw/image/upload/v1713866997/Book-Store/Avatar/kwuemqemetzsp4jw21mt.webp'
                  }
                  className='w-8 h-8 object-cover mr-2 rounded-full'
                  alt='Client'
                />
                {/* {data?.fullname} */}
              </td>
              <td className='px-6 py-3 whitespace-nowrap text-xs font-medium text-gray-700'>{data?.email}</td>
              <td className='px-6 py-3 whitespace-nowrap text-xs font-medium text-gray-700'>{data?.provider}</td>
              <td className='px-6 py-3 whitespace-nowrap text-xs font-medium text-gray-700'>
                <span
                  className={`inline-flex text-xs font-medium leading-5 rounded-full 
                        ${
                          data?.emailVerify === false
                            ? 'text-gray-700'
                            : data.emailVerify === true
                            ? 'text-teal-700'
                            : ''
                        }`}
                >
                  {data?.emailVerify ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                </span>
              </td>
              <td
                className={`px-6 py-3 whitespace-nowrap text-xs font-medium text-gray-700 ${
                  data?.is_active === 1 ? 'text-blue-700' : 'text-red-700'
                }`}
              >
                {data?.is_active === 1 ? 'Đang sử dụng' : 'Vô hiệu hóa'}
              </td>
              <td className='px-6 py-3 whitespace-nowrap text-xs font-medium text-gray-700'>
                {formatsHelper.formatDate(data?.createdAt)}
              </td>
              <td className='px-6 py-3 whitespace-nowrap text-xs font-medium text-gray-700'>
                {data?.role_id?.role_Name}
              </td>
              <td className='px-6 py-3 whitespace-nowrap text-xs font-medium text-gray-700 flex gap-1'>
                <SelectBox
                  onChange={(e) => handleUpdateRoleAccount(data._id, e.target.value)}
                  optionData={roleData}
                  size='m'
                  rounded='full'
                  defaultValue={data.role_id ? data.role_id?._id : ''}
                />
                <Button
                  size='m'
                  rounded='s'
                  addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                  onClick={() => handleDelete(data._id)}
                >
                  <AppIcons.TrashBinIcon width='20' height='20' />
                </Button>
                <Button
                  size='m'
                  rounded='s'
                  addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                  onClick={() => handleIsActiveAccount(data._id)}
                >
                  {data?.is_active === 1 ? (
                    <AppIcons.LockopenIcon width='20' height='20' />
                  ) : (
                    <AppIcons.LockClosedIcon width='20' height='20' />
                  )}
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
