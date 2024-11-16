import React, { useState } from 'react';
import { InputText } from '../../../components/ui/form';
const CouponSection = () => {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    alert(`Applying coupon: ${couponCode}`);
  };

  return (
    <div className="border p-4 space-y-4 rounded-[7px]">
      <h2 className="font-bold text-lg">Phiếu giảm giá</h2>
      <InputText
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Nhập mã giảm giá"
        className="border w-full p-2 outline-none rounded-[3px]"
      />
      <button
        onClick={handleApplyCoupon}
        className="bg-blue-500 text-white w-full py-2 rounded">
        Áp dụng
      </button>
    </div>
  );
};

export default CouponSection;
