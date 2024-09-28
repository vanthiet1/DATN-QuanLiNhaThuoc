import { cn } from "../../../utils/helpers/mergeClasses";

const TableRole = ({ data, addClassNames, titleRow, cols, styleRows, handleDelete }) => {
  console.log(data);
  
  return (
    <table className={cn(`w-full text-left table-auto border-collapse shadow-md bg-white mb-5 rounded-[5px] ${addClassNames}`)}>
      <thead>
        <tr className={cn(`border-b rounded-[5px] border-gray-300 text-white ${styleRows}`)}>
          {titleRow && titleRow.map((title, index) => (
            <th key={index} className='p-3 w-max font-normal3 dark:text-[#333]'>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.map((role) => (
          <tr key={role._id} className='border-b border-gray-300 hover:bg-gray-50'>
            <td className='p-3'>{role.role_Name}</td>
            <td className='p-3 flex gap-1'>
            <span className="p-2 text-green-600 border-b-2 border-slate-400 cursor-pointer">Add</span>
              <span className="p-2 text-blue-600 border-b-2 border-slate-400 cursor-pointer">Edit</span>
              <span className="p-2 text-red-600 border-b-2 border-slate-400 cursor-pointer flex items-center" onClick={() => handleDelete(role._id)}>
                Delete
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableRole;
