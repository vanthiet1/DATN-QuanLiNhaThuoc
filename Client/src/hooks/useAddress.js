import { useEffect, useState } from 'react';
import provinceServices from '../services/provinceService';

const useAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvice, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [stateAddress, setStateAddress] = useState({});

  const handleChangeValueWard = async (value) => {
    const responsiveData = await provinceServices.getInforDetails(value);
    if (responsiveData) {
      const { full_name } = responsiveData;
      const convertFullNameToArr = full_name.split(',');
      setStateAddress(convertFullNameToArr);
    }
  };

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
    if (selectedProvice) {
      handleGetDistricts();
    }
  }, [selectedProvice]);

  useEffect(() => {
    const handleGetwards = async () => {
      const responsiveData = await provinceServices.getInforWards(selectedDistrict);
      setWards(responsiveData);
    };
    if (selectedDistrict) {
      handleGetwards();
    }
  }, [selectedDistrict]);
  return {
    provinces,
    districts,
    wards,
    selectedProvice,
    selectedDistrict,
    stateAddress,
    setSelectedProvince,
    setSelectedDistrict,
    setStateAddress,
    handleChangeValueWard
  };
};

export default useAddress;
