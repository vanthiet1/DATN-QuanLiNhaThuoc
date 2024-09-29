import React from 'react';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import formatsHelper from '../../utils/helpers/formats';
import { useNavigate } from 'react-router-dom';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import blogServices from '../../services/blogService';
const blogBreadCrumbs = [
  {
    path: `/dashboard`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All Blog'
  }
];
const AllBlog = () => {
  const { isLoading, isError, responsData: blogData, messageError } = useFetch(blogServices.getAllBlogs);
  console.log(blogData);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    return <div className='text-red-500 text-center'>{messageError}</div>;
  }

  const handleEdit = (id) => {
    console.log('Navigating to edit blog with ID:', id);
    navigate(`/admin/edit-blog/${id}`);
  };

  const handleDelete = async (id) => {
    await blogServices.deleteBlog(id);
  };

  return (
    <>
      <BreadCrumb crumbsData={blogBreadCrumbs} addClassNames='my-3' />
      <div className='max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center'>All Blog</h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Blog Image
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Blog title
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Blog description
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Blog content
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
                    <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900'>{blog.image}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{blog.title}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{blog.description}</td>

                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{blog.content}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
                      <Button
                        size='m'
                        rounded='m'
                        addClassNames='bg-blue-600 text-white hover:bg-blue-500 px-3 py-1 rounded-md'
                        onClick={() => handleEdit(blog._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='m'
                        rounded='m'
                        addClassNames='bg-red-600 text-white hover:bg-red-500 px-3 py-1 rounded-md ml-2'
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
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
