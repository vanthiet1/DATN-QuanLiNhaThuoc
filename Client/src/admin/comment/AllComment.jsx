import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import formatsHelper from '../../utils/helpers/formats';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import commetServices from '../../services/commentService';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
const couponBreadCrumbs = [
  {
    path: `/dashboard`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All Comment'
  }
];
const AllComment = () => {
  const {
    isLoading,
    isError,
    responsData: initialCommentData,
    messsageError
  } = useFetch(commetServices.getAllComments);

  const [commentData, setCommentData] = useState([]);
  const confirmDialog = useConfirmDialog();

  useEffect(() => {
    if (initialCommentData) {
      setCommentData(initialCommentData);
    }
  }, [initialCommentData]);

  const handleDelete = async (id, name) => {
    try {
      const result = await confirmDialog({
        title: 'Xóa Comment',
        iconLeft: <AppIcons.TrashBinIcon />,
        message: `Bạn có muốn xóa ${name} không?`,
        confirmLabel: 'Có, tôi đồng ý',
        cancelLabel: 'Không, giữ lại'
      });

      if (result) {
        await commetServices.deleteComment(id);
        setCommentData((prevComments) => prevComments.filter((comment) => comment._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    return <div className='text-red-500 text-center'>{messsageError}</div>;
  }

  return (
    <>
      <BreadCrumb crumbsData={couponBreadCrumbs} addClassNames='my-3' />
      <div className='max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center'>All Comment</h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Content
                </th>

                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  User ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Product Id
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Date Create
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {commentData &&
                commentData.map((comment) => (
                  <tr key={comment._id} className='hover:bg-gray-100'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{comment.content}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{comment.user_id?.fullname}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{comment.product_id?.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {formatsHelper.formatDate(comment.date_create)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
                      <Button
                        size='m'
                        rounded='m'
                        addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                        onClick={() => handleDelete(comment._id, comment.content)}
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

export default AllComment;
