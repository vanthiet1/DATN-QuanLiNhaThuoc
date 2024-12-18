import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import formPharmacySchema from '../../utils/validations/formPharmacy';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { Button } from '../../components/ui/button';
import { ErrorMessage, InputText } from '../../components/ui/form';
import pharmacyServices from '../../services/pharmacyService';
import provinceServices from '../../services/provinceService';

const pharamcyBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Thêm nhà thuốc'
  }
];

const FormAddPharmacy = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formPharmacySchema.pharmacy) });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvice, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [stateAddress, setStateAddress] = useState({});

  useEffect(() => {
    const handleGetProvinces = async () => {
      const responsiveData = await provinceServices.getInforProvices();
      setProvinces(responsiveData);
    };
    handleGetProvinces();
  }, []);

  useEffect(() => {
    const handleGetDistricts = async () => {
      const responsiveData = await provinceServices.getInforDistricts(selectedProvice);
      setDistricts(responsiveData);
    };
    handleGetDistricts();
  }, [selectedProvice]);

  useEffect(() => {
    const handleGetwards = async () => {
      const responsiveData = await provinceServices.getInforWards(selectedDistrict);
      setWards(responsiveData);
    };
    handleGetwards();
  }, [selectedDistrict]);

  const handleChangeValueWard = async (value) => {
    const responsiveData = await provinceServices.getInforDetails(value);
    if (responsiveData) {
      const { latitude, longitude, full_name } = responsiveData;
      setStateAddress({ latitude, longitude, full_name });
    }
  };

  const handleCreateProduct = async (data) => {
    const { street, ...restData } = data;

    const pharamacyData = {
      ...restData,
      latitude: stateAddress.latitude,
      longitude: stateAddress.longitude,
      address: street + ', ' + stateAddress.full_name
    };
    await pharmacyServices.createPharmacy(pharamacyData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleCreateProduct)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                 Tên nhà thuốc
              </label>
              <InputText size='m' rounded='s' placeholder='Bình An Dược' refinput={register('name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-3'>
              <div className='flex flex-col text-gray-700 mb-4'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Tỉnh Thành
                </label>
                <select
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  id='province'
                  className='border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
                >
                  <option value=''>-- Chọn Tỉnh/Thành phố --</option>
                  {provinces.length > 0 &&
                    provinces.map((province) => {
                      return (
                        <option value={province.id} key={province.id}>
                          {province.full_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className='flex flex-col text-gray-700 mb-4'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Huyện
                </label>
                <select
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedProvice}
                  className=' border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
                >
                  <option value=''>-- Chọn Quận/Huyện --</option>
                  {districts.length > 0 &&
                    districts.map((district) => {
                      return (
                        <option value={district.id} key={district.id}>
                          {district.full_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className='flex flex-col text-gray-700 mb-4'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Thị Xã
                </label>
                <select
                  onChange={(e) => handleChangeValueWard(e.target.value)}
                  disabled={!selectedDistrict}
                  className='  border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
                >
                  <option value=''>-- Chọn Phường/Xã --</option>
                  {wards.length > 0 &&
                    wards.map((ward) => {
                      return (
                        <option value={ward.id} key={ward.id}>
                          {ward.full_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Đường 
              </label>
              <InputText size='m' rounded='s' placeholder='Enter pharmacy street here' refinput={register('street')} />
              {errors.street && <ErrorMessage messsage={errors.street.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Số điện thoại nhà thuốc
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Nhập số điện thoại nhà thuốc'
                refinput={register('phone_number')}
              />
              {errors.phone_number && <ErrorMessage messsage={errors.phone_number.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Thời gian nhà thuốc mở
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Nhập thời gian nhà thuốc mở'
                refinput={register('opening_hours')}
              />
              {errors.opening_hours && <ErrorMessage messsage={errors.opening_hours.message}></ErrorMessage>}
            </div>
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
    </form>
  );
};

const AddPharmacy = () => {
  return (
    <div>
      <SectionWrapper title='Thêm nhà thuốc' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={pharamcyBreadCrumbs} />
        <FormAddPharmacy />
      </SectionWrapper>
    </div>
  );
};

export default AddPharmacy;
