import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import orderServices from "../../services/orderService";
import useFetch from "../../hooks/useFetch";
import pharmacyServices from "../../services/pharmacyService";
import orderDetailsServices from "../../services/orderDetailsService";
import formatsHelper from "../../utils/helpers/formats";
import historyOrderServices from "../../services/historyOrderServices";
const HistoryOrder = () => {
    const { id } = useParams();
    const [hisOrderUser, setHisOrderUser] = useState([]);
    const { isLoading, responsData: hisOrderDetail, isError } = useFetch(
        () => orderServices.getOrderById(id), { id }, [id]
    );
    const { responsData: hisOrderProductDetail } = useFetch(
        () => orderDetailsServices.getOrderDetailByOrderId(id), { id }, [id]
    );
    const { responsData: pharmacy } = useFetch(
        () => pharmacyServices.getPharmacy()
    );
    const getDataHistoryOrder = async () => {
        const dataHisOrder = await historyOrderServices.getAllHistoryOrders();
        if(!dataHisOrder) return;
        const matchingOrder = dataHisOrder?.data?.find(
            (hisOrder) =>
                hisOrder?.order_id?._id === hisOrderProductDetail?.[0]?.order_id
        );
        console.log('matchingOrder',matchingOrder);
        
        setHisOrderUser(matchingOrder);
    };
    useEffect(() => {
        getDataHistoryOrder()
    }, [])
    console.log(hisOrderUser);
    
    console.log(hisOrderUser?.updated_by_user_id?.role_id?.role_Name);


    return (
        <div>
            <div className="shadow p-5 rounded-lg">
                <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-semibold text-lg">Thông Tin Giao Hàng</h1>
                    {hisOrderDetail?.status === 4 ? <span className="text-[#fff] rounded-[10px] text-[13px] px-2 py-1 bg-green-500">Đơn đã được giao thành công</span> : (
                        <span
                        className={`text-[#fff] rounded-[10px] text-[13px] px-2 py-1 ${hisOrderDetail?.status === 4
                            ? 'bg-green-500'
                            : hisOrderDetail?.status === 5
                                ? 'bg-[#EA0054]'
                                : ''
                            }`}
                    >
                        {
                            hisOrderDetail?.status === 5 &&
                                !["admin", "staff"].includes(hisOrderUser?.updated_by_user_id?.role_id?.role_Name)
                                ? 'Bạn đã hủy đơn'
                                : 'Shop hủy đơn'
                        }
                       
                    </span>
                    )}
               

                </div>
                <div className="flex pt-5 gap-3 md:flex-row">
                    <div className="flex md:flex-col items-center">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-[#2563EB]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                />
                            </svg>
                            <div className="flex justify-center my-1">
                                <div className="w-[2px] md:w-[4px] h-[80px] max-md:h-[100px] border-dashed bg-[#2563EB] rounded-[20px]"></div>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-[#2563EB]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className="block pb-3 text-sm md:text-base">Từ</span>
                            <span className="font-bold block">
                                Nhà thuốc {pharmacy?.[0]?.name}
                            </span>
                            <span className="block text-sm">{pharmacy?.[0]?.address}</span>
                        </div>
                        <div className="pt-5">
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="font-bold">{hisOrderDetail?.user?.fullname}</span>
                                <span>|</span>
                                {hisOrderDetail?.address?.phone && (
                                    <span className="font-bold">
                                        +84
                                        {hisOrderDetail?.address?.phone
                                            ? hisOrderDetail?.address?.phone
                                            : hisOrderDetail?.user?.phone}
                                    </span>
                                )}
                                <span className="font-bold">{hisOrderDetail?.user?.email}</span>
                            </div>
                            <span className="block text-sm">{hisOrderDetail?.address?.street}</span>
                        </div>
                    </div>
                </div>
            </div>
            {hisOrderProductDetail && hisOrderProductDetail.length > 0 && (
                <div className="grid grid-cols-1 gap-4 ">
                    {hisOrderProductDetail.map((productHistoryOrder) => (
                        <Link to={`/product/${productHistoryOrder?.product?.slug}`}>
                            <div
                                key={productHistoryOrder._id}
                                className="p-4 border rounded-lg shadow-sm mt-1"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <img
                                        className="w-[60px] h-[60px] object-cover rounded-md"
                                        src={productHistoryOrder?.images[0]?.url_img}
                                        alt={productHistoryOrder?.product?.name || "Product"}
                                    />
                                    <div>
                                        <h3 className="text-gray-800 font-semibold text-sm">
                                            {productHistoryOrder?.product?.name}
                                        </h3>
                                        <p className="text-gray-600 text-xs">
                                            {formatsHelper.formatDate(productHistoryOrder?.createdAt)} -{" "}
                                            {formatsHelper.FormatDateAndTime(productHistoryOrder?.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-700 font-semibold">{formatsHelper.currency(productHistoryOrder?.price)}</p>
                                    <p className="text-gray-600 font-semibold">x{productHistoryOrder?.quantity}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryOrder;