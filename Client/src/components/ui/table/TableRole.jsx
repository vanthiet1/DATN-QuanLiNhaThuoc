import { Link } from 'react-router-dom';
import { cn } from '../../../utils/helpers/mergeClasses';
import AppIcons from '../../../components/ui/icon';

import { PATH_ROUTERS_ADMIN } from '../../../utils/constant/routers';
import BreadCrumb from '../../breadCrumb/BreadCrumb';
import { Button } from '../button';

const roleBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All Role'
  }
];

const TableRole = ({ data, addClassNames, titleRow, cols, styleRows, handleDetele, handleEdit }) => {
  return (
    <>
      <BreadCrumb crumbsData={roleBreadCrumbs} addClassNames='my-3' />
      <div className='max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center'>All Role</h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead className='w-full'>
              <tr className='bg-gray-200 w-full'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Role Name
                </th>

                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  action
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 '>
              {data &&
                data.map((role) => (
                  <tr key={role._id} className='hover:bg-gray-100 px-6'>
                    <td className='px-6 py-4'>{role.role_Name}</td>
                    <td className='px-4 py-4 flex gap-1'>
                      <Link to={`/admin/edit-role/${role._id}`}>
                        <Button
                          size='m'
                          rounded='s'
                          addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                          onClick={() => {
                            handleEdit(_id);
                          }}
                        >
                          <AppIcons.EditIcon width='20' height='20' />
                        </Button>
                      </Link>
                      <Button
                        size='m'
                        rounded='s'
                        addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                        onClick={() => handleDetele(role)}
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

export default TableRole;
