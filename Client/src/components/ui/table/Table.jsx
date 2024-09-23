import { cn } from "../../../utils/helpers/mergeClasses"
const Table = ({ data, addClassNames, titleRow, cols, styleRows, ...props }) => {
  return (
    <table className={cn(` text-left table-auto border-collapse shadow-md bg-white mb-5 rounded-[5px] ${addClassNames}`)}>
      <thead>
        <tr className={cn(`border-b rounded-[5px] border-gray-300  text-white ${styleRows}`)}>
          {titleRow.map((title) => (
            <th className='p-3 font-normal'>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((items) => (
          <tr key={items.orderId} className='border-b border-gray-300 hover:bg-gray-50'>
            <td className='flex items-center p-3'>
              <img src={items.image} className='w-8 h-8 object-cover mr-2' alt="Client" />
              {items.client}
            </td>
            <td className='p-3'>#{items.orderId}</td>
            <td className='p-3'>${items.amount}</td>
            <td className='p-3'
            >
              <td className="px-4 py-3">
                <td className='p-3'>
                  <span className={`inline-flex px-2 text-xs font-medium leading-5 rounded-full 
    ${items.status === 'Un-paid' ? 'px-3 py-1 rounded-full text-orange-700 bg-red-500 dark:text-white' :
                      items.status === 'Completed' ? 'px-3 py-1 rounded-full dark:bg-green-700 dark:text-white' :
                        items.status === 'Paid' ? 'px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-600 dark:text-white' :
                          'bg-gray-100 text-gray-800'}
  `}>{items.status}</span>
                </td>

              </td>

            </td>

            <td className='p-3'>{items.dateCreated}</td>
            <td className='p-3 flex gap-1'>
              <span className="p-2 rounded-[5px]  text-green-600">Add</span>
              <span className="p-2 rounded-[5px] bg-blue-600 text-[#fff]">Edit</span>
              <span className="p-2 rounded-[5px] bg-red-600 text-[#fff]">Delete</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table