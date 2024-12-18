import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import formatsHelper from '../../utils/helpers/formats';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import bannerServices from '../../services/bannerService';
import { useNavigate } from 'react-router-dom';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import blogServices from '../../services/blogService';

const blogBreadCrumbs = [
  {
    path: `/dashboard`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Tất cả bài viết'
  }
];

const AllBlog = () => {
  const { isLoading, isError, responsData: initialBlogData, messsageError } = useFetch(blogServices.getAllBlogs);

  const [blogData, setBlogData] = useState([]);
  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialBlogData) {
      setBlogData(initialBlogData);
    }
  }, [initialBlogData]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  const handleDetailsClick = (id) => {
    navigate(`/admin/blog-detail-admin/${id}`);
  };

  const handleDelete = async (id, name) => {
    try {
      const result = await confirmDialog({
        title: 'Xóa Blog',
        iconLeft: <AppIcons.TrashBinIcon />,
        message: `Bạn có muốn xóa ${name} không ?`,
        confirmLabel: 'Có, tôi đồng ý',
        cancelLabel: 'Không, giữ lại'
      });
      if (result) {
        await blogServices.deleteBlog(id);

        setBlogData(blogData.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
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
      <BreadCrumb crumbsData={blogBreadCrumbs} addClassNames='my-3' />
      <div className='max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg'>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Image
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Title
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  description
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  author
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {blogData &&
                blogData.map((blog) => (
                  <tr key={blog._id} className='hover:bg-gray-100'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                      <img src={blog.image} alt={blog.title} className='w-24 h-12 object-cover' />
                    </td>
                    <td className='w-10 px-6 py-4 whitespace-nowrap text-sm text-gray-800 overflow-hidden text-ellipsis'>
                    {blog.title.length > 30 ? `${blog.title.substring(0, 30)}...` : blog.title}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 overflow-hidden text-ellipsis'>
                      {blog.description.length > 35 ? `${blog.description.substring(0, 35)}...` : blog.description}
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>{blog.user_id?.fullname}</td>

                    <td className='px-6 py-4 whitespace-nowrap text-sm flex items-center mt-4 mr-3'>
                      <Button
                        onClick={() => {
                          handleDetailsClick(blog._id);
                        }}
                        size='m'
                        rounded='s'
                        addClassNames='bg-teal-500 text-white hover:bg-teal-600 px-3 py-1 rounded-md'
                      >
                        <AppIcons.EyeIcon width='20' height='20' />
                      </Button>
                      <Button
                        size='m'
                        rounded='s'
                        addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                        onClick={() => {
                          handleEdit(blog._id);
                        }}
                      >
                        <AppIcons.EditIcon width='20' height='20' />
                      </Button>
                      <Button
                        size='m'
                        rounded='s'
                        addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                        onClick={() => handleDelete(blog._id, blog.title)}
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

export default AllBlog;
