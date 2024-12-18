import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formBannerSchema from '../../utils/validations/formBanner';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, InputText, FileInput } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import bannerServices from '../../services/bannerService';
import { useEffect, useState } from 'react';
import { ProcessLoading } from '../../components/ui/loaders';
import { useNavigate, useParams } from 'react-router-dom';

const bannerBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width="16" height="16" />,
  },
  {
    title: 'Chỉnh sửa banner',
  },
];

const FormEditBanner = () => {
  const { id } = useParams();
  const [isLoadingEditBanner, setIsLoadingEditBanner] = useState(false);
  const [bannerData, setBannerData] = useState(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formBannerSchema.bannerHero) });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const fetchedBanner = await bannerServices.getBannerById(id);
        setBannerData(fetchedBanner);
        setValue('name', fetchedBanner.name);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    if (id) fetchBanner();
  }, [id, setValue]);

  const handleEdit = async (data) => {
    const { bannerImg, name } = data;
    const formData = new FormData();

    if (bannerImg && bannerImg.length > 0) {
      formData.append('bannerImg', bannerImg[0]);
    } else if (bannerData?.bannerImg) {
      formData.append('bannerImg', bannerData.bannerImg);
    }
    formData.append('name', name);

    setIsLoadingEditBanner(true);
    try {
      await bannerServices.updateBanner(id, formData);
      navigate(`/${PATH_ROUTERS_ADMIN.ALL_BANNER}`);
    } catch (error) {
      console.error('Error updating banner:', error);
    } finally {
      setIsLoadingEditBanner(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEdit)} encType="multipart/form-data">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4">
          <div>
            <div className="flex flex-col text-gray-700 mb-4">
              <label htmlFor="" className="font-medium text-sm mb-2">
                Cập nhật lại banner
              </label>
              {bannerData?.url_img && (
                <div className="flex gap-4 items-center p-2 border border-solid border-gray-300 bg-gray-100 mb-4 rounded">
                  <div className="p-1 bg-white">
                    <img
                      src={bannerData.url_img}
                      alt={bannerData.name}
                      className="w-[450px] h-[150px] object-cover"
                    />
                  </div>
                </div>
              )}
              <FileInput refinput={register('bannerImg')} size="m" rounded="s" />
              {errors.bannerImg && <ErrorMessage message={errors.bannerImg.message} />}
            </div>
            <div className="flex flex-col text-gray-700 mb-4">
              <label htmlFor="" className="font-medium text-sm mb-2">
                Tên banner
              </label>
              <InputText
                size="m"
                rounded="s"
                placeholder="Banner name here"
                refinput={register('name')}
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
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
      Cập nhật 
      </Button>
      <ProcessLoading isLoading={isLoadingEditBanner} message="Updating banner..." />
    </form>
  );
};

const EditBanner = () => {
  return (
    <div>
      <SectionWrapper title="Chỉnh sửa banner" addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={bannerBreadCrumbs} />
        <FormEditBanner />
      </SectionWrapper>
    </div>
  );
};

export default EditBanner;
