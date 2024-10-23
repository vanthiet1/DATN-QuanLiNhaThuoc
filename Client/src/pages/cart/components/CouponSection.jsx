import React, { useState } from 'react';

const CouponSection = () => {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    alert(`Applying coupon: ${couponCode}`);
  };

  return (
    <div className="border p-4 space-y-4">
      <h2 className="font-bold text-lg">Phiếu giảm giá</h2>
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Nhập mã giảm giá"
        className="border w-full p-2"
      />
      <button
        onClick={handleApplyCoupon}
        className="bg-blue-500 text-white w-full py-2 rounded">
        Áp dụng
      </button>
     
      <p className="text-green-500 mt-2">Coupon applied successfully!</p>
    </div>
  );
};

export default CouponSection;
