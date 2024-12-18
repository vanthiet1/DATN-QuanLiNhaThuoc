import React, { createContext, useContext } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import blogServices from '../../services/blogService';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import useFetch from '../../hooks/useFetch';
import formatHelper  from '../../utils/helpers/formats';
const adminProductDetailsBreadCrums = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'tất cả bài viết',
    path: `/${PATH_ROUTERS_ADMIN.ALL_BLOG}`
  },
  {
    title: 'chi tiết'
  }
];

const BlogDetailsContext = createContext();

const BlogDetailsAdminProiver = ({ children }) => {
  const { id } = useParams();
  const { isLoading, responsData: blogData } = useFetch(() => blogServices.getOneBlog(id), {}, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <BlogDetailsContext.Provider value={{ blogData }}>{children}</BlogDetailsContext.Provider>;
};

const SectionBlogDetail = () => {
  const { blogData } = useContext(BlogDetailsContext);

  if (!blogData) {
    return <div>No blog details available.</div>;
  }

  return (
    <div className="px-20">
      <h1 className="text-3xl text-center mt-3">{blogData.title}</h1>
      <p className="italic mt-3">{blogData.description}</p>
      <p className="italic mt-3 text-right px-5 text-slate-500">Ngày xuất bản: {formatHelper.formatDate(blogData.updatedAt)}</p>
      {blogData && <ShowContentBlog content={blogData.content} />}
    </div>
  );
};


const ShowContentBlog = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="max-w-[1000px] mx-auto mt-[50px]">
      {sanitizedContent ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};


const BlogDetailAdmin = () => {
  return (
    <div>
      <SectionWrapper title='Chi tiết bài viết' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={adminProductDetailsBreadCrums} />
        <BlogDetailsAdminProiver>
          <SectionBlogDetail />
        </BlogDetailsAdminProiver>
      </SectionWrapper>
    </div>
  );
};

export default BlogDetailAdmin;
