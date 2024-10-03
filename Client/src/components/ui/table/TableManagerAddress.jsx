import { cn } from "../../../utils/helpers/mergeClasses"
const TableAddressUser = ({ data, addClassNames, titleRow, cols, styleRows, handleDelete, handleIsActiveAccount, handleUpdateRoleAccount }) => {

    return (
        <table className={cn(`w-full text-left table-auto border-collapse shadow-md bg-white mb-5 rounded-[5px] ${addClassNames}`)}>
            <thead>
                <tr className={cn(`border-b rounded-[5px] border-gray-300 text-white ${styleRows}`)}>
                    {titleRow && titleRow.map((title, index) => (
                        <th key={index} className='p-3 w-max font-normal3 dark:text-[#333] '>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.map((data) => (
                    <tr key={data._id} className='border-b border-gray-300 hover:bg-gray-50'>
                        <td className='flex items-center p-3 h-[100px]'>
                            <img src={data?.user_id?.avatar || "https://res.cloudinary.com/dz93cdipw/image/upload/v1713866997/Book-Store/Avatar/kwuemqemetzsp4jw21mt.webp"} className='w-8 h-8 object-cover mr-2 rounded-full' alt="Client" />
                            {data?.user_id?.fullname}
                        </td>
                        <td className='p-2'>{data?.street}</td>
                        <td className='p-2'>{data?.district}</td>
                        <td className='p-2'>  {data?.commune}  </td>
                        <td className='p-2'>{data?.address}</td>
                        <td className='p-2'>{data?. city}</td>
                        <td className='p-2'>{data?.receiver}</td>
                        <td className='p-2'>{data?.phone}</td>
                        <td className='p-2 flex gap-1'>
                            <span className="p-2 text-red-600 border-b-2 border-slate-400 cursor-pointer flex items-center" onClick={() => handleDelete(data._id)}>
                                Delete
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableAddressUser 