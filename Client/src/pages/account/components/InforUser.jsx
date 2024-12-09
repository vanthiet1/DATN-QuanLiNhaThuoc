import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { InputText } from '../../../components/ui/form';
import { Button } from '../../../components/ui/button';
import { UserContext } from '../../../contexts/UserContext';
import addressServices from '../../../services/addressService';
import useFetch from '../../../hooks/useFetch';
import SpinnerLoading from '../../../components/ui/loaders/SpinnerLoading';
const InforUser = () => {
    const API_KEY = 'e0ee9079b5a54833871a0f6aad0d9019'
    const { user } = useContext(UserContext)
    const [address, setAddress] = useState("");
    const [error, setError] = useState('');
    const [watchId, setWatchId] = useState(null);
    const [loadingAdress, setLoadingAdress] = useState(false)

    const { responsData: adressData, isLoading: isProductLoading } =
        useFetch(() => addressServices.getAddressByUserId(user._id), {}, [user]);

    useEffect(() => {
        if (adressData) {
            setAddress(adressData.address || "");
        }
    }, [adressData])

    const handleUpdateAdress = async () => {
        await addressServices.updateAddressUser(user?._id, { address: address })
    }

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchAddress(latitude, longitude);
                },
                () => {
                    setError('Không thể lấy được vị trí của bạn. Vui lòng thử lại.');
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
            setWatchId(id);
        } else {
            setError('Trình duyệt của bạn không hỗ trợ Geolocation');
        }
    };

    const stopWatchingLocation = () => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
    };


    const fetchAddress = async (latitude, longitude) => {
        try {
            setLoadingAdress(true)
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
            );
            const data = response.data.results[0];
            if (data) {
                setLoadingAdress(false)
            }
            const components = data.components;
            const road = components?.road === 'unnamed road' ? "Không có tên đường" : components?.road ;
            const village = components.village || components?.quarter ; 
            const district = components?.county || components?.suburb
            const province = components?.state ||  components?.city
            const country = components?.country || "";
            const formattedAddress = `${road}, ${village}, ${district}, ${province} , ${country}`;
            setAddress(formattedAddress);
        } catch (error) {
            setError('Không thể lấy được địa chỉ từ tọa độ.');
        }
    };
    useEffect(() => {
        return () => {
            stopWatchingLocation();
        };
    }, []);

    return (
        <div className='flex flex-col gap-3'>
            <div>
                <div class="rounded-[15px] border border-[#2563EB] pl-3 py-2 mb-4">
                    <span class="text-[#2563EB] block font-semibold text-[17px]">Tên đăng nhập</span>
                    <span class="text-[#333] block font-semibold">{user?.fullname || "Chưa đăng nhập"}  </span>
                </div>
            </div>
            <div>
                <div class="rounded-[15px] border border-[#2563EB] pl-3 py-2 mb-4">
                    <span class="text-[#2563EB] block  font-semibold  text-[17px]">ID người dùng</span>
                    <span class="text-[#333] block  font-semibold ">{user?._id.slice(0, 10) || "Chưa đăng nhập"} </span>
                </div>
            </div>
            <div className='mb-5 '>
                <div className='relative'>
                    <InputText
                        disabled={!user ? true : false}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        size='l'
                        rounded='m'
                        addClassNames='w-full border  border-[#2563EB]  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-[15px] pl-3 py-3 font-semibold'
                        placeholder='Cập nhật địa chỉ'
                    />
                    <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
                        {loadingAdress && (<SpinnerLoading size="30" />)}
                    </div>
                </div>

            </div>
            <div className='bg-[#2563EB] text-[#fff] px-5 py-3 w-full sm:w-auto flex justify-center items-center hover:bg-[#1255e5] duration-200 rounded-md'>
                <span onClick={handleGetLocation} className='cursor-pointer'>Cập nhật vị trí hiện tại</span>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 '>
                <Button
                    onClick={handleUpdateAdress}
                    size="m"
                    rounded="l"
                    addClassNames="bg-[#2563EB] text-[#fff] px-5 py-3 w-full sm:w-auto flex justify-center items-center hover:bg-[#1255e5] duration-200 "
                    outline
                >
                    Cập nhật
                </Button>
                <Button
                    size="m"
                    rounded="l"
                    addClassNames="bg-gray-500 text-[#fff] opacity-50 px-5 py-2 w-full sm:w-auto flex justify-center items-center"
                    outline
                >
                    Hủy
                </Button>
            </div>

        </div>
    );
};

export default InforUser;