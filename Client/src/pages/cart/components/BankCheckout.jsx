import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { SpinnerLoading } from '../../../components/ui/loaders';
import bankServices from '../../../services/bankService';
import orderServices from '../../../services/orderService';
import { UserContext } from '../../../contexts/UserContext';
import { showToastSuccess } from '../../../configs/toastConfig';
import { PATH_ROUTERS_CLIENT } from '../../../utils/constant/routers';
import { TabUIAccountContext } from '../../../contexts/TabUIAccountContext';

const BankCheckout = ({ setShowQrCode }) => {
  const { setTabIndex, } = useContext(TabUIAccountContext) || null;
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [order, setOrder] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const maxAttempts = 100;
  const intervalTime = 3000;
  const navigate = useNavigate();
  
  const redirectYourOrder = () => {
    navigate(`${PATH_ROUTERS_CLIENT.ACCOUNT}`)
    setTabIndex(4)
}

  useEffect(() => {
    const fetchOrder = async () => {
      const dataOrder = await orderServices.getOrderByUserId(user?._id);
      setOrder(dataOrder[dataOrder.length - 1]);
    };
    if (user?._id) {
      fetchOrder();
    }
  }, [user]);

  const updatePayOrder = async () => {
    await orderServices.updatePayOrder(order?._id, { isPay: true });
  };

  const checkPaymentStatus = async (attempts) => {
    if (attempts > maxAttempts || isPaid) {
      stopChecking();
      if (!isPaid) {
        setShowQrCode(false);
      }
      return;
    }
    try {
      const data = await bankServices.checkPaidBank();
      const lastPaid = data[data.length - 1];
      if (
        lastPaid["Giá trị"] >= order?.total_price &&
        lastPaid["Mô tả"].includes(`madonhang${order?._id}`)
      ) {
        setIsPaid(true);
        showToastSuccess("Thanh toán thành công");
        updatePayOrder();
        stopChecking();
        redirectYourOrder();
      } else {
        console.log("Vui lòng thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái thanh toán:", error);
    }
  };



  useEffect(() => {
    let attempts = 0;
    const interval = setInterval(() => {
      checkPaymentStatus(++attempts);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [order]);

  const stopChecking = () => {
    setShowQrCode(false);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowQrCode(false);
    }
  }, [timeLeft]);

  const imageUrl = `https://api.vietqr.io/image/970422-9213112004-7BoO0Iy.jpg?accountName=NGUYEN%20VAN%20THIET&amount=${order?.total_price || ''}&addInfo=madonhang${order?._id}`;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {isLoading && (
        <div className="absolute">
          <SpinnerLoading size={30} />
        </div>
      )}
      <img
        className={`w-[350px] ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        src={imageUrl}
        alt="QR Code"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
      <p className={`mt-2 text-gray-600 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-30`}>
        QR Code sẽ hết hạn sau: <b className='text-blue-600'>{Math.floor(timeLeft / 60)} phút {timeLeft % 60} giây</b>
      </p>
    </div>
  );
};

export default BankCheckout;
