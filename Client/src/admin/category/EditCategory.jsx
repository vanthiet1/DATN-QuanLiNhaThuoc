// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
// import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
// import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
// import AppIcons from '../../components/ui/icon';
// import formProductSchema from '../../utils/validations/formProduct';
// import { ErrorMessage, InputText, SelectBox } from '../../components/ui/form';
// import { Button } from '../../components/ui/button';
// import TextArea from '../../components/ui/form/Textarea';
// import categoryServices from '../../services/categoryService';
// import subCategoryServices from '../../services/subCategoryService';
// import { useNavigate, useParams } from 'react-router-dom';
// import useFetch from '../../hooks/useFetch';

// const CategoryBreadCrumb = [
//   {
//     path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
//     title: 'Dashboard',
//     icon: <AppIcons.HomeIcon width="16" height="16" />,
//   },
//   {
//     title: 'Edit Category',
//   },
// ];

// const optionCategoryDefault = [
//   {
//     title: 'Thuốc',
//     value: '66c2a08a860ea2d7f7413476',
//   },
// ];

// const FormEditCategory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const {
//     handleSubmit,
//     register,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(formProductSchema.category),
//   });

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const { detailCategories } = await categoryServices.getDetailCategory(id);
//         if (detailCategories && detailCategories.length) {
//           const category = detailCategories[0];
//           setValue('name', category.name);
//           setValue('description', category.description);
//           setValue('order', category.order);
//         }
//       } catch (error) {
//         console.error('Error fetching category:', error.message);
//       }
//     };

//     fetchCategory();
//   }, [id, setValue]);

//   const handleUpdate = async (data) => {
//     await categoryServices.updateCategory(id, data);
//     navigate('/admin/all-category');
//   };

//   return (
//     <form onSubmit={handleSubmit(handleUpdate)}>
//       <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         <div className="md:col-span-2 rounded-md w-full border border-gray-300 shadow-sm p-4">
//           <div>
//             <div className="flex flex-col text-gray-700 mb-4">
//               <label htmlFor="name" className="font-medium text-sm mb-2">
//                 Category name
//               </label>
//               <InputText
//                 size="m"
//                 rounded="s"
//                 placeholder="Category name here"
//                 refinput={register('name')}
//               />
//               {errors.name && <ErrorMessage message={errors.name.message} />}
//             </div>
//             <div className="flex flex-col text-gray-700 mb-4">
//               <label htmlFor="order" className="font-medium text-sm mb-2">
//                 Category order
//               </label>
//               <InputText
//                 size="m"
//                 rounded="s"
//                 placeholder="Category order here"
//                 refinput={register('order')}
//               />
//               {errors.order && <ErrorMessage message={errors.order.message} />}
//             </div>
//             <div className="flex flex-col text-gray-700 mb-4">
//               <label htmlFor="description" className="font-medium text-sm mb-2">
//                 Category description
//               </label>
//               <TextArea
//                 placeholder="Enter category description here"
//                 rounded="s"
//                 refinput={register('description')}
//               />
//               {errors.description && <ErrorMessage message={errors.description.message} />}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Button
//         size="m"
//         rounded="s"
//         leftIcon={<AppIcons.PlusIcon width="18" height="18" />}
//         addClassNames="bg-gray-800 mt-3 text-white hover:bg-gray-700"
//       >
//         Update
//       </Button>
//     </form>
//   );
// };

// const FormEditSubCategory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { isLoading, isError, responsData: categoryData, messsageError } = useFetch(categoryServices.getCategory, {});

//   const [categorySelect, setCategorySelect] = useState(optionCategoryDefault);

//   useEffect(() => {
//     if (Array.isArray(categoryData) && categoryData.length > 0) {
//       const cateOptions = categoryData.map((cate) => ({
//         title: cate.name,
//         value: cate._id,
//       }));
//       setCategorySelect(cateOptions);
//     }
//   }, [categoryData]);

//   const {
//     handleSubmit,
//     register,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(formProductSchema.subCategory),
//   });

//   useEffect(() => {
//     const fetchSubCategory = async () => {
//       try {
//         const subCategory = await subCategoryServices.getOneSubCategory(id);
//         setValue('name', subCategory.name);
//         setValue('category_id', subCategory.category_id);
//         setValue('description', subCategory.description);
//         setValue('order', subCategory.order);
//       } catch (error) {
//         console.error('Error fetching Subcategory:', error.message);
//       }
//     };

//     fetchSubCategory();
//   }, [id, setValue]);

//   const handleUpdate = async (data) => {
//     await subCategoryServices.updateSubCategory(id, data);
//     navigate('/admin/all-category');
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>{messsageError}</div>;
//   if (!categorySelect.length) return 'Bạn cần tạo category trước khi tạo sub category';

//   return (
//     <form onSubmit={handleSubmit(handleUpdate)}>
//       <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         <div className="md:col-span-2 rounded-md w-full border border-gray-300 shadow-sm p-4">
//           <div>
//             <div className="flex flex-col text-gray-700 mb-4">
//               <label className="font-medium text-sm mb-2">Category</label>
//               <SelectBox optionData={categorySelect} size="m" rounded="s" refinput={register('category_id')} />
//               {errors.category_id && <ErrorMessage message={errors.category_id.message} />}
//             </div>
//             <div className="flex flex-col text-gray-700 mb-4">
//               <label className="font-medium text-sm mb-2">Sub category name</label>
//               <InputText
//                 size="m"
//                 rounded="s"
//                 placeholder="Sub category name here"
//                 refinput={register('name')}
//               />
//               {errors.name && <ErrorMessage message={errors.name.message} />}
//             </div>
//             <div className="flex flex-col text-gray-700 mb-4">
//               <label className="font-medium text-sm mb-2">Sub category order</label>
//               <InputText
//                 size="m"
//                 rounded="s"
//                 placeholder="Sub category order here"
//                 refinput={register('order')}
//               />
//               {errors.order && <ErrorMessage message={errors.order.message} />}
//             </div>
//             <div className="flex flex-col text-gray-700 mb-4">
//               <label className="font-medium text-sm mb-2">Sub category description</label>
//               <TextArea
//                 placeholder="Enter Sub category description here"
//                 rounded="s"
//                 refinput={register('description')}
//               />
//               {errors.description && <ErrorMessage message={errors.description.message} />}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Button
//         size="m"
//         rounded="s"
//         leftIcon={<AppIcons.PlusIcon width="18" height="18" />}
//         addClassNames="bg-gray-800 mt-3 text-white hover:bg-gray-700"
//       >
//         Update
//       </Button>
//     </form>
//   );
// };

// const CategoryFormContext = createContext({});

// const CategoryContextProvider = ({ children }) => {
//   const [isActionCreate, setIsActionCreate] = useState(false);

//   return (
//     <CategoryFormContext.Provider value={{ isActionCreate, setIsActionCreate }}>
//       {children}
//     </CategoryFormContext.Provider>
//   );
// };

// const EditCategory = () => {
//   return (
//     <div>
//       <CategoryContextProvider>
//         <SectionWrapper title="Edit Category" addClassNames={{ wrapper: 'mt-2' }}>
//           <BreadCrumb crumbsData={CategoryBreadCrumb} />
//           <FormEditCategory />
//         </SectionWrapper>

//         <SectionWrapper title="Edit Subcategory" addClassNames={{ wrapper: 'mt-2', title: 'mb-2' }}>
//           <FormEditSubCategory />
//         </SectionWrapper>
//       </CategoryContextProvider>
//     </div>
//   );
// };

// export default EditCategory;


import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import formProductSchema from '../../utils/validations/formProduct';
import { ErrorMessage, InputText, SelectBox } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import TextArea from '../../components/ui/form/Textarea';
import categoryServices from '../../services/categoryService';
import subCategoryServices from '../../services/subCategoryService';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const CategoryBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width="16" height="16" />,
  },
  {
    title: 'Edit Category',
  },
];

const optionCategoryDefault = [
  {
    title: 'Thuốc',
    value: '66c2a08a860ea2d7f7413476',
  },
];

const FormEditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formProductSchema.category),
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { detailCategories } = await categoryServices.getDetailCategory(id);
        if (detailCategories && detailCategories.length) {
          const category = detailCategories[0];
          setValue('name', category.name);
          setValue('description', category.description);
          setValue('order', category.order);
        }
      } catch (error) {
        console.error('Error fetching category:', error.message);
      }
    };

    fetchCategory();
  }, [id, setValue]);

  const handleUpdate = async (data) => {
    await categoryServices.updateCategory(id, data);
    navigate('/admin/all-category');
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 rounded-md w-full border border-gray-300 shadow-sm p-4">
          <div>
            <div className="flex flex-col text-gray-700 mb-4">
              <label htmlFor="name" className="font-medium text-sm mb-2">
                Category name
              </label>
              <InputText
                size="m"
                rounded="s"
                placeholder="Category name here"
                refinput={register('name')}
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>
            <div className="flex flex-col text-gray-700 mb-4">
              <label htmlFor="order" className="font-medium text-sm mb-2">
                Category order
              </label>
              <InputText
                size="m"
                rounded="s"
                placeholder="Category order here"
                refinput={register('order')}
              />
              {errors.order && <ErrorMessage message={errors.order.message} />}
            </div>
            <div className="flex flex-col text-gray-700 mb-4">
              <label htmlFor="description" className="font-medium text-sm mb-2">
                Category description
              </label>
              <TextArea
                placeholder="Enter category description here"
                rounded="s"
                refinput={register('description')}
              />
              {errors.description && <ErrorMessage message={errors.description.message} />}
            </div>
          </div>
        </div>
      </div>
      <Button
        size="m"
        rounded="s"
        leftIcon={<AppIcons.PlusIcon width="18" height="18" />}
        addClassNames="bg-gray-800 mt-3 text-white hover:bg-gray-700"
      >
        Update
      </Button>
    </form>
  );
};



const CategoryFormContext = createContext({});

const CategoryContextProvider = ({ children }) => {
  const [isActionCreate, setIsActionCreate] = useState(false);

  return (
    <CategoryFormContext.Provider value={{ isActionCreate, setIsActionCreate }}>
      {children}
    </CategoryFormContext.Provider>
  );
};

const EditCategory = () => {
  return (
    <div>
      <CategoryContextProvider>
        <SectionWrapper title="Edit Category" addClassNames={{ wrapper: 'mt-2' }}>
          <BreadCrumb crumbsData={CategoryBreadCrumb} />
          <FormEditCategory />
        </SectionWrapper>
      </CategoryContextProvider>
    </div>
  );
};

export default EditCategory;
