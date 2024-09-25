
const PharmacyCard = ({ pharmacy }) => {
  const { name, address, latitude, longitude, phone_number, opening_hours, createdAt, updatedAt } = pharmacy;

  return (
    <div className='bg-white shadow-md rounded-lg p-6 max-w-md mx-auto my-5'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{name}</h2>
      <p className='text-gray-600 mb-2'>
        <span className='font-semibold'>Địa chỉ:</span> {address}
      </p>
      <p className='text-gray-600 mb-2'>
        <span className='font-semibold'>Tọa độ:</span> {latitude}, {longitude}
      </p>
      <p className='text-gray-600 mb-2'>
        <span className='font-semibold'>Số điện thoại:</span> {phone_number}
      </p>
      <p className='text-gray-600 mb-2'>
        <span className='font-semibold'>Giờ mở cửa:</span> {opening_hours}
      </p>
      <p className='text-gray-400 text-sm'>
        <span className='font-semibold'>Ngày tạo:</span> {new Date(createdAt).toLocaleDateString()}
      </p>
      <p className='text-gray-400 text-sm'>
        <span className='font-semibold'>Ngày cập nhật:</span> {new Date(updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PharmacyCard;
