import ReactPaginate from 'react-paginate';
import AppIcons from '../ui/icon';

const Paginate = ({ totalNumberPage, setNumberPage }) => {
  return (
    <ReactPaginate
      containerClassName='pagination flex space-x-2 mt-4 justify-end'
      activeClassName='active'
      pageClassName='page-item w-[36px] h-[36px] overflow-hidden rounded border border-gray-300 hover:border-blue-500 hover:text-indigo-500 cursor-pointer'
      pageLinkClassName='w-full flex items-center justify-center h-full'
      previousLinkClassName='flex items-center justify-center text-gray-600 w-[36px] h-[36px] overflow-hidden rounded border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 cursor-pointer'
      nextLinkClassName='flex items-center justify-center text-gray-600 w-[36px] h-[36px] overflow-hidden rounded border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 cursor-pointer'
      breakLinkClassName='px-4 py-2 bg-gray-200 text-gray-600 rounded'
      activeLinkClassName='text-white bg-blue-500'
      previousLabel={<AppIcons.ArrowDownIcon addClassNames='rotate-90' />}
      nextLabel={<AppIcons.ArrowDownIcon addClassNames='rotate-[270deg]' />}
      onPageChange={(event) => setNumberPage(event.selected + 1)}
      breakLabel='...'
      pageCount={totalNumberPage}
    />
  );
};

export default Paginate;
