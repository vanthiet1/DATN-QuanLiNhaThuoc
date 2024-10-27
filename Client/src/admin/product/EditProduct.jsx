import React, { createContext, useContext, useEffect, useState } from 'react';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, FileInput, InputText, SelectBox, Textarea, InputDate } from '../../components/ui/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formProductSchema from '../../utils/validations/formProduct';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import brandServices from '../../services/brandService';
import categoryServices from '../../services/categoryService';
import Editor from '../../components/ui/editor/Editor';
import { useParams } from 'react-router-dom';
import { ProcessLoading } from '../../components/ui/loaders';
import { useNavigate } from 'react-router-dom';
import formatsHelper from '../../utils/helpers/formats';
import { DATE_TYPE_IS_YEAR_TO_DATE } from '../../utils/constant/common';
import { Image } from '../../components/ui/image';

const FormEditProduct = () => {
  const { productData } = useContext(FormEditProductContext);
  console.log(productData);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formProductSchema.product)
  });

  useEffect(() => {
    if (productData) {
      const {
        name,
        brand_id,
        sub_category_id,
        description_short,
        percent_price,
        price_distcount,
        price_old,
        stock,
        production_date,
        expiration_date,
        images
      } = productData[0];
      setValue('name', name);
      // setValue('sub_category_id', sub_category_id);
      setValue('brand_id', brand_id);
      setValue('description_short', description_short);
      setValue('percent_price', percent_price);
      setValue('price_distcount', price_distcount);
      setValue('price_old', price_old);
      setValue('stock', stock);
      setValue(
        'production_date',
        production_date ? formatsHelper.formatDate(production_date, DATE_TYPE_IS_YEAR_TO_DATE) : ''
      );
      setValue(
        'expiration_date',
        expiration_date ? formatsHelper.formatDate(expiration_date, DATE_TYPE_IS_YEAR_TO_DATE) : ''
      );
      setValue(
        'productImg',
        images.map((image) => image.url_img)
      );
    }
  }, [productData, setValue]);

  const optionSubCategoryDefault = [
    {
      title: 'Thuốc',
      value: '66c2a08a860ea2d7f7413476'
    }
  ];

  const optionBrandDefault = [
    {
      title: 'yki',
      value: '66c89fdaa4ef9971831b5e6a'
    }
  ];

  const [brandSelectData, setBrandSelectData] = useState(optionBrandDefault);
  const [categorySelectData, setCategorySelectData] = useState(optionSubCategoryDefault);
  const [isChangeCateSelect, setIsChangeCateSelect] = useState(true);
  const [subCategorySelectData, setsubCategorySelectData] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [isLoadingUpdateProduct, setIsLoadingUpdateProduct] = useState('idle');

  const handleConvertSelect = (arr) => {
    return arr.map((item) => {
      return { title: item.name, value: item._id, ...item };
    });
  };

  const cateAndBrandServices = [categoryServices.getCategory, brandServices.getBrand];
  const { isLoading: isLoadingCateAndBrand, isError, messageError, responsData } = useFetch(cateAndBrandServices);

  useEffect(() => {
    if (Array.isArray(responsData) && responsData.length > 0) {
      const [categoryData, brandData] = responsData;
      const brandSelectConvert = handleConvertSelect(brandData);
      const categorySelectConvert = handleConvertSelect(categoryData);
      setBrandSelectData(brandSelectConvert);
      setCategorySelectData(categorySelectConvert);
    }
  }, [responsData]);

  useEffect(() => {}, [isChangeCateSelect, subCategorySelectData]);

  const handleChangeValueSelectCategory = (e) => {
    const value = e.target.value;
    const subCateData = categorySelectData.find((cate) => cate.value === value);
    const subCateDataSelectConvert = handleConvertSelect(subCateData.subcategories);

    setsubCategorySelectData(subCateDataSelectConvert);
    setIsChangeCateSelect(true);
  };

  const handleUpdateProduct = async (data) => {
    const { productImg, ...productRest } = data;
    const formData = new FormData();
    Array.from(productImg).forEach((file) => {
      formData.append('productImg', file);
    });

    for (const key in productRest) {
      formData.append(key, productRest[key]);
    }
    if (descriptionValue !== '') {
      formData.append('description', descriptionValue);
    }

    setIsLoadingUpdateProduct(true);
    await productServices.updateProduct(productData[0]._id, formData);
    reset();
    setIsLoadingUpdateProduct(false);
    setDescriptionValue('');
    navigate(`/${PATH_ROUTERS_ADMIN.ALL_PRODUCT}`);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProduct)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Product Image
              </label>
              <div className='flex gap-4 items-center p-2 border border-solid border-gray-300 bg-gray-100 mb-4 rounded'>
                {productData &&
                  productData.length > 0 &&
                  productData[0].images.map((image) => {
                    return (
                      <div className='p-1 bg-white' key={image._id}>
                        <Image
                          src={image.url_img}
                          alt={image.url_img}
                          addClassNames='w-[250px] h-[150px] object-cover'
                        />
                      </div>
                    );
                  })}
              </div>
              <FileInput refinput={register('productImg')} size='m' rounded='s'></FileInput>
              {errors.productImg && <ErrorMessage messsage={errors.productImg.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Product Name
              </label>
              <InputText size='m' rounded='s' placeholder='Type product name here' refinput={register('name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Product Price Old
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter product price old here'
                refinput={register('price_old')}
              />
              {errors.price_old && <ErrorMessage messsage={errors.price_old.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Product Price Distcount
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter product price distcount here'
                refinput={register('price_distcount')}
              />
              {errors.price_distcount && <ErrorMessage messsage={errors.price_distcount.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Product Price percent
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter product price here'
                refinput={register('percent_price')}
              />
              {errors.percent_price && <ErrorMessage messsage={errors.percent_price.message}></ErrorMessage>}
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col text-gray-700 mb-4'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Production date
                </label>
                <InputDate size='m' rounded='s' refinput={register('production_date', { valueAsDate: true })} />
                {errors.production_date && <ErrorMessage messsage={errors.production_date.message}></ErrorMessage>}
              </div>
              <div className='flex flex-col text-gray-700 mb-4'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Expiration date
                </label>
                <InputDate
                  size='m'
                  rounded='s'
                  defaultValue='2024-10-10T17:00:00.000Z'
                  refinput={register('expiration_date')}
                />
                {errors.expiration_date && <ErrorMessage messsage={errors.expiration_date.message}></ErrorMessage>}
              </div>
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Short description
              </label>

              <Textarea
                placeholder='Enter product short description here'
                rounded='s'
                refinput={register('description_short')}
              />
              {errors.description_short && <ErrorMessage messsage={errors.description_short.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Stock Qunatity
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter product  stock qunatity here'
                refinput={register('stock')}
              />
              {errors.stock && <ErrorMessage messsage={errors.stock.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Full description
              </label>
              <Editor
                name='description'
                value={productData ? productData[0].description : ''}
                editorLoaded={true}
                onChange={setDescriptionValue}
              ></Editor>
              {descriptionValue && (
                <div className='font-normal mt-2 w-full p-2 text-sm text-gray-800 border border-slate-300 border-solid '>
                  {descriptionValue}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='h-fit rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            {isLoadingCateAndBrand ? (
              'Loading select ...'
            ) : (
              <>
                <div className='flex flex-col text-gray-700 mb-4'>
                  <label htmlFor='' className='font-medium text-sm mb-2'>
                    Select Product Category
                  </label>
                  <select
                    onChange={handleChangeValueSelectCategory}
                    className='font-normal w-full hover:cursor-pointer text-sm text-gray-800 border border-slate-300 placeholder:text-gray-700 border-solid focus:outline-1 focus:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-slate-300 rounded px-[12px] py-[6px]'
                  >
                    {categorySelectData.length > 0 &&
                      categorySelectData.map((cate, index) => {
                        return (
                          <option value={cate.value} key={cate._id + index + cate.title}>
                            {cate.title}
                          </option>
                        );
                      })}
                  </select>
                  {!isChangeCateSelect && errors.sub_category_id && (
                    <ErrorMessage messsage='bạn cần lựa chọn catgory'></ErrorMessage>
                  )}
                </div>
                {isChangeCateSelect && (
                  <div className='flex flex-col text-gray-700 mb-4'>
                    <label htmlFor='' className='font-medium text-sm mb-2'>
                      Select Product Sub Category
                    </label>
                    <SelectBox
                      optionData={subCategorySelectData}
                      nameSelected='select here'
                      size='m'
                      rounded='s'
                      refinput={register('sub_category_id')}
                    />
                    {errors.sub_category_id && <ErrorMessage messsage={errors.sub_category_id.message}></ErrorMessage>}
                  </div>
                )}
                <div className='flex flex-col text-gray-700 mb-4'>
                  <label htmlFor='' className='font-medium text-sm mb-2'>
                    Select Product Brand
                  </label>
                  <SelectBox
                    optionData={brandSelectData}
                    nameSelected='select here'
                    size='m'
                    rounded='s'
                    refinput={register('brand_id')}
                  />
                  {errors.brand_id && <ErrorMessage messsage={errors.brand_id.message}></ErrorMessage>}
                </div>
              </>
            )}

            {isError && <div>{messageError}</div>}
          </div>
        </div>
      </div>
      <Button
        size='m'
        rounded='s'
        leftIcon={<AppIcons.PlusIcon width='18' height='18' />}
        addClassNames='bg-gray-800 mt-3 text-white hover:bg-gray-700'
      >
        Create
      </Button>
      <ProcessLoading
        isLoading={isLoadingUpdateProduct}
        message='Đang trong quá trình cập nhật sản phẩm'
      ></ProcessLoading>
    </form>
  );
};

const FormEditProductContext = createContext();

const FormEditProductContextProvider = ({ children }) => {
  const { slug } = useParams();

  const { isLoading, responsData: productData } = useFetch(() => productServices.getProductWithBySlug(slug), {}, [
    slug
  ]);

  const productEditBreadCrumbs = [
    {
      path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
      title: 'Dashboard',
      icon: <AppIcons.HomeIcon width='16' height='16' />
    },
    {
      path: `/${PATH_ROUTERS_ADMIN.ALL_PRODUCT}`,
      title: 'All product'
    },
    {
      title: productData ? productData[0].name : ''
    }
  ];

  return (
    <FormEditProductContext.Provider value={{ isLoading, productData }}>
      <BreadCrumb crumbsData={productEditBreadCrumbs}></BreadCrumb>
      {children}
    </FormEditProductContext.Provider>
  );
};

const EditProduct = () => {
  return (
    <div>
      <SectionWrapper title='Edit product' addClassNames={{ wrapper: 'mt-2' }}>
        <FormEditProductContextProvider>
          <FormEditProduct />
        </FormEditProductContextProvider>
      </SectionWrapper>
    </div>
  );
};

export default EditProduct;
