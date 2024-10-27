import React, { useContext , useEffect, useState } from 'react';
import { InputText } from '../../../components/ui/form';
import { Button } from '../../../components/ui/button';
import { UserContext } from '../../../contexts/UserContext';
import addressServices from '../../../services/addressService';
import useFetch from '../../../hooks/useFetch';
const InforUser = () => {
    const {user} = useContext(UserContext)
  const [address,setAddress] = useState("");
  const { responsData: adressData, isLoading: isProductLoading } = 
  useFetch(() => addressServices.getAddressByUserId(user._id), {}, [user]);
   
   useEffect(()=>{
   if(adressData){
    setAddress(adressData.address || "");
   }
   },[adressData])
    const handleUpdateAdress = async ()=>{
            await addressServices.updateAddressUser(user?._id ,{address:address})
      }
      
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
                    <span class="text-[#333] block  font-semibold ">{user?._id.slice(0,10) || "Chưa đăng nhập"} </span>
                </div>
            </div>
            <div className='mb-5 '>
               
                <InputText
                  disabled={!user ? true : false}
                   value={address}
                   onChange={(e)=>setAddress(e.target.value)}
                    size='l'
                    rounded='m'
                    addClassNames='w-full border  border-[#2563EB]  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-[15px] pl-3 py-3 font-semibold'
                    placeholder='Cập nhật địa chỉ'
                />
               
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