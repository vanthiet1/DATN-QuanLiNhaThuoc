import { cn } from "../../../utils/helpers/mergeClasses"
import formatsHelper from "../../../utils/helpers/formats";
import SelectBox from "../form/SelectBox";
const Table = ({ data, addClassNames, titleRow, cols, styleRows, handleDelete, handleIsActiveAccount, roleData, handleUpdateRoleAccount }) => {

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
                            <img src={data?.avatar || "https://res.cloudinary.com/dz93cdipw/image/upload/v1713866997/Book-Store/Avatar/kwuemqemetzsp4jw21mt.webp"} className='w-8 h-8 object-cover mr-2 rounded-full' alt="Client" />
                            {data?.fullname}
                        </td>
                        <td className='p-2'>{data?.email}</td>
                        <td className='p-2'>{data?.provider}</td>
                        <td className='p-2'>
                            <span className={`inline-flex px-2 text-xs font-medium leading-5 rounded-full 
                        ${data?.emailVerify === false ? 'px-2 py-1 w-max rounded-full text-orange-700 bg-red-500 dark:text-white' :
                                    data.emailVerify === true ? 'px-3 py-1 rounded-full dark:bg-green-700 text-white' : ""}`}>
                                {data?.emailVerify ? "Đã kích hoạt" : "Chưa kích hoạt"}
                            </span>
                        </td>
                        <td className='p-2'>{data?.is_active === 1 ? "Đang sử dụng" : "Vô hiệu hóa"}</td>
                        <td className='p-2'>{formatsHelper.formatDate(data?.createdAt)}</td>
                        <td className='p-2'>{data?.role_id?.role_Name}</td>
                        <td className='p-2 flex gap-1'>
                            <SelectBox
                                onChange={(e) => handleUpdateRoleAccount(data._id, e.target.value)}
                                optionData={roleData}
                                size="m"
                                rounded="m"
                                defaultValue={data.role_id ? data.role_id?._id : ''}
                            />
                            <span className="p-2 text-red-600 border-b-2 border-slate-400 cursor-pointer flex items-center" onClick={() => handleDelete(data._id)}>
                                Delete
                            </span>
                            <span className="p-2 text-[#333] border-b-2 border-slate-400 cursor-pointer" onClick={() => handleIsActiveAccount(data._id)}>
                                {data?.is_active === 1 ? "Block" : "Open"}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table