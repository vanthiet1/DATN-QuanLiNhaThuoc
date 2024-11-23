import { Link, useParams } from 'react-router-dom';
import AppIcons from '../../components/ui/icon/index';
import useFetch from '../../hooks/useFetch';
import blogServices from '../../services/blogService';
import formatsHelper from '../../utils/helpers/formats';
import { createContext, useContext } from 'react';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import DOMPurify from 'dompurify';
import { SpinnerLoading } from '../../components/ui/loaders';

const BlogDetailsAdminProiver = ({ children }) => {
  const { id } = useParams();
  const { isLoading, responsData: blogData } = useFetch(() => blogServices.getOneBlog(id), {}, [id]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <SpinnerLoading />
      </div>
    );
  }

  return <BlogDetailsContext.Provider value={{ blogData }}>{children}</BlogDetailsContext.Provider>;
};

const SectionBlogDetail = () => {
  const { blogData } = useContext(BlogDetailsContext);

  if (!blogData) {
    return <div>No blog details available.</div>;
  }

  return (
    <div className='max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8'>
      <div className='flex flex-wrap gap-2 pb-6 items-center'>
        <Link to='/' className='flex items-center text-gray-600 hover:text-gray-800'>
          <AppIcons.HomeIcon addClassNames='mr-2' />
          Trang chủ
        </Link>
        <AppIcons.ArrowRight />
        <h1 className='text-gray-600'>Góc sống khoẻ</h1>
        <AppIcons.ArrowRight />
        <h1 className='text-gray-600'>Bài viết</h1>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <div className='space-y-6 flex-1'>
          <div className=''>
            <h1 className='text-3xl mt-3'>{blogData.title}</h1>
            <p className='italic mt-3'>{blogData.description}</p>
            <p className='italic mt-3 text-right px-5 text-slate-500'>
              Ngày xuất bản: {formatsHelper.formatDate(blogData.updatedAt)}
            </p>
            {blogData && <ShowContentBlog content={blogData.content} />}
          </div>
        </div>

        <div className='w-full md:w-[30%] space-y-6'>
          <div className='w-full border border-gray-200 rounded-lg overflow-hidden'>
            <img
              src='https://www.medigoapp.com/assets/images-html/sub-banner.jpg'
              alt='Banner'
              className='w-full h-auto object-cover'
            />
            <div className='flex flex-col md:flex-row justify-between items-center p-4'>
              <div className='text-center md:text-left mb-4 md:mb-0'>
                <span className='block text-gray-600'>Bạn cần tư vấn</span>
                <span className='block text-blue-600 font-bold text-xl'>Với chúng tôi</span>
              </div>
              <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'>ĐẶT TƯ VẤN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogDetailsContext = createContext();
const ShowContentBlog = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className='max-w-[1000px] mx-auto mt-[50px]'>
      {sanitizedContent ? <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} /> : <p>No content available.</p>}
    </div>
  );
};
const BlogDetail = () => {
  return (
    <div>
      <BlogDetailsAdminProiver>
        <SectionBlogDetail />
      </BlogDetailsAdminProiver>
    </div>
  );
};

export default BlogDetail;
