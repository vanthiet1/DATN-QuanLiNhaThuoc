import { cn } from "../../../utils/helpers/mergeClasses";
import formatsHelper from "../../../utils/helpers/formats";

const TableOrders = ({ data, addClassNames, titleRow, handleDelete }) => {
    return (
        <table className={cn(`w-full text-left table-auto border-collapse shadow-md bg-white mb-5 rounded-[5px] ${addClassNames}`)}>
            <thead>
                <tr className={cn(`border-b rounded-[5px] border-gray-300 text-white bg-blue-600`)}>
                    {titleRow && titleRow.map((title, index) => (
                        <th key={index} className='p-3 w-max font-normal3 dark:text-[#333]'>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.map((order) => (
                    <tr key={order._id} className='border-b border-gray-300 hover:bg-gray-50'>
                        <td className='p-2'>{order.fullname}</td>
                        <td className='p-2'>{order.quantity}</td>
                        <td className='p-2'>{order.bookTitle}</td>
                        <td className='p-2'>{(order.price)}</td>
                        <td className='p-2'>{(order.totalPrice)}</td>
                        <td className='p-2'>{order.status}</td>
                        <td className='p-2'>{formatsHelper.formatDate(order.purchaseDate)}</td>
                        <td className='p-2'>
                            <span className="text-red-600 cursor-pointer" onClick={() => handleDelete(order._id)}>Hủy</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableOrders;
