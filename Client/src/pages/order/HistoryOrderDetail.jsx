import { useParams } from "react-router-dom";
import orderServices from "../../services/orderService";
import useFetch from "../../hooks/useFetch";
import pharmacyServices from "../../services/pharmacyService";
import orderDetailsServices from "../../services/orderDetailsService";

const HistoryOrder = () => {
    const { id } = useParams();
    const { isLoading, responsData: hisOrderDetail, isError } = useFetch(
        () => orderServices.getOrderById(id), { id }, [id]
    );
    const {responsData: hisOrderProductDetail } = useFetch(
        () => orderDetailsServices.getOrderDetailByOrderId(id), { id }, [id]
    );
    const { responsData: pharmacy } = useFetch(
        () => pharmacyServices.getPharmacy()
    );
    console.log(hisOrderProductDetail);

   

    return (
        <div>
            <div className="shadow p-5">
                <div className="flex items-center gap-2">
                    <h1 className="font-semibold">Thông Tin Giao Hàng</h1>
                    <span className="text-[#fff] bg-[#EA0054] rounded-1/2 text-[13px] px-2 rounded-[10px] py-1">
                        {hisOrderDetail?.status === 5 && "Khách hàng hủy đơn"}
                        {hisOrderDetail?.status === 4 && "Đơn đã được giao thành công"}
                    </span>
                </div>
                <div className="flex pt-5 gap-3">
                    <div>
                        <div>
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#2563EB]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <div className="flex justify-center my-1">
                                <div className="w-[4px] h-[90px] border-dashed  bg-[#2563EB] text-center rounded-[20px]"></div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                        </div>
                    </div>
                    <div >
                        <div>
                            <span className="block pb-3">Từ</span>
                            <span className="font-bold">Nhà thuốc {pharmacy?.[0]?.name
                            }</span>
                            <span className="block">
                                {pharmacy?.[0]?.address}
                            </span>
                        </div>
                        <div className="pt-5">
                            <div className="flex items-center gap-5">
                                <span className="font-bold">{hisOrderDetail?.user?.fullname}</span>
                                <span>|</span>
                                {hisOrderDetail?.address?.phone && (
                                    <span className="font-bold">
                                        +84{
                                            hisOrderDetail?.address?.phone ? hisOrderDetail?.address?.phone : hisOrderDetail?.user?.phone
                                        }
                                    </span>
                                )}
                                <span className="font-bold">{hisOrderDetail?.user?.email}</span>
                            </div>
                            <span>{hisOrderDetail?.address?.
                                street
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryOrder;