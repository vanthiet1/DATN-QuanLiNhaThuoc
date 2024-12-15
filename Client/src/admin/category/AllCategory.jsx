import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import categoryServices from '../../services/categoryService';
import subCategoryServices from '../../services/subCategoryService';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

const CategoryBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All Category'
  }
];

const AllCategory = () => {
  const {
    isLoading: categoryLoading,
    isError: categoryError,
    responsData: initialCategoryData,
    messageError: categoryErrorMessage
  } = useFetch(categoryServices.getCategory);

  const {
    isLoading: subCategoryLoading,
    isError: subCategoryError,
    responsData: initialSubCategoryData,
    messageError: subCategoryErrorMessage
  } = useFetch(subCategoryServices.getSubCategory);

  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [openSubcategories, setOpenSubcategories] = useState({});
  const confirmDialog = useConfirmDialog();

  useEffect(() => {
    if (initialCategoryData) {
      setCategoryData(initialCategoryData);
    }
    if (initialSubCategoryData) {
      setSubCategoryData(initialSubCategoryData);
    }
  }, [initialCategoryData, initialSubCategoryData]);

  const handleToggleSubcategory = (categoryId) => {
    setOpenSubcategories((prevOpenSubcategories) => ({
      ...prevOpenSubcategories,
      [categoryId]: !prevOpenSubcategories[categoryId]
    }));
  };

  const handleDelete = async (id, name, isSubcategory = false) => {
    try {
      const result = await confirmDialog({
        title: 'Xóa Category',
        iconLeft: <AppIcons.TrashBinIcon />,
        message: `Bạn có muốn xóa ${name} không?`,
        confirmLabel: 'Có, tôi đồng ý',
        cancelLabel: 'Không, giữ lại'
      });

      if (result) {
        if (isSubcategory) {
          const response = await subCategoryServices.deleteSubCategory(id);
          if (response ) {
            setSubCategoryData((prevSubcategories) => prevSubcategories.filter((sub) => sub._id !== id));
          }
        } else {
          const response  = await categoryServices.deleteCategory(id);
          if (response ) {
            setCategoryData((prevCategory) => prevCategory.filter((category) => category._id !== id));
          }
        }
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };
  const handleEditSubCategory = (id) => {
    navigate(`/admin/edit-subcategory/${id}`);
  };
  if (categoryLoading || subCategoryLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div>Loading...</div>
      </div>
    );
  }

  if (categoryError) {
    return <div className='text-red-500 text-center'>{categoryErrorMessage}</div>;
  }

  if (subCategoryError) {
    return <div className='text-red-500 text-center'>{subCategoryErrorMessage}</div>;
  }

  const getSubcategoriesByCategoryId = (categoryId) => {
    const filteredSubcategories = subCategoryData.filter(
      (sub) => sub.category_id && sub.category_id._id === categoryId
    );
    return filteredSubcategories;
  };

  return (
    <>
      <BreadCrumb crumbsData={CategoryBreadCrumb} addClassNames='my-3' />
      <h2 className='text-[22px] font-medium capitalize text-gray-700'>All Category</h2>
      <div className='mt-4 w-[80%]'>
        <div>
          {categoryData.map((cate) => (
            <div key={cate._id} className='bg-white mb-2 px-3 py-4 rounded-md shadow-md border border-gray-300'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-lg font-bold'>{cate.name}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    onClick={() => handleToggleSubcategory(cate._id)}
                    size='m'
                    rounded='s'
                    addClassNames='bg-teal-500 text-white hover:bg-teal-600 px-3 py-1 rounded-md'
                  >
                    {openSubcategories[cate._id] ? (
                      <AppIcons.X_CloseIcon width='20' height='20' />
                    ) : (
                      <AppIcons.EyeIcon width='20' height='20' />
                    )}
                  </Button>
                  <Button
                    size='m'
                    rounded='s'
                    addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                    onClick={() => {
                      handleEdit(cate._id);
                    }}
                  >
                    <AppIcons.EditIcon width='20' height='20' />
                  </Button>
                  <Button
                    size='m'
                    rounded='s'
                    addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                    onClick={() => handleDelete(cate._id, cate.name)}
                  >
                    <AppIcons.TrashBinIcon width='20' height='20' />
                  </Button>
                </div>
              </div>

              {openSubcategories[cate._id] && (
                <div className='ml-4 my-2 '>
                  <div className='bg-slate-200 px-2 py-1 rounded-md text-center mb-1 text-lg'>Subcategory</div>
                  {getSubcategoriesByCategoryId(cate._id).length > 0 ? (
                    getSubcategoriesByCategoryId(cate._id).map((sub) => (
                      <div key={sub._id} className='flex bg-slate-100 justify-between py-2 px-2 mb-1 rounded-md'>
                        <div>{sub.name}</div>
                        <div className='flex items-center gap-2'>
                          <Button
                            rounded='s'
                            outline={true}
                            addClassNames='text-gray-600 hover:text-teal-500 hover:border-teal-500 w-[30px] h-[30px] flex items-center justify-center'
                            onClick={() => handleEditSubCategory(sub._id)}
                          >
                            {<AppIcons.EditIcon width='20' height='20' />}
                          </Button>
                          <Button
                            rounded='s'
                            outline={true}
                            addClassNames='text-gray-600 hover:text-rose-500 hover:border-rose-500 w-[30px] h-[30px] flex items-center justify-center'
                            onClick={() => handleDelete(sub._id, sub.name, true)}
                          >
                            {<AppIcons.TrashBinIcon width='20' height='20' />}
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='text-gray-500'>No subcategories available</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCategory;
