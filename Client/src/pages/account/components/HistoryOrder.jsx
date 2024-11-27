import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import AppIcons from '../../../components/ui/icon/index'
import { PATH_ROUTERS_CLIENT } from "../../../utils/constant/routers";
import historyOrderServices from "../../../services/historyOrderServices";
import useFetch from "../../../hooks/useFetch";
import { UserContext } from "../../../contexts/UserContext";
import formatsHelper from "../../../utils/helpers/formats";
const HistoryOrder = () => {
    const { user } = useContext(UserContext)
    const [hisOrderUser, setHisOrderUser] = useState([])
    const getDataHistoryOrder = async () => {
        const dataHisOrder = await historyOrderServices.getAllHistoryOrders();
        const filteredHistoryOrders = dataHisOrder?.data?.filter(hisOrder => hisOrder?.order_id?.user_id === user?._id
        );
        setHisOrderUser(filteredHistoryOrders || [])
    }

    useEffect(() => {
        getDataHistoryOrder();
    }, [])
    console.log('hisOrderUser', hisOrderUser);


    return (
        <div>
            {hisOrderUser && hisOrderUser.length > 0 ? (
                <div class="h-[600px] overflow-x-auto">
                    {hisOrderUser.map((hisOrder) => (
                        <div className=" shadow p-5 rounded-md">
                            <Link to={`/${PATH_ROUTERS_CLIENT.HISTORY_ORDER}`}>
                                <div className="px-5 cursor-pointer ">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center pb-3">
                                            <span className="block font-semibold">Đơn {hisOrder?.order_id
                                                ?._id} </span>
                                            <span
                                                className={`p-1 w-max flex justify-center rounded-[7px] ${hisOrder?.order_id?.status === 5
                                                    ? 'text-red-500 bg-[#FFE7E9] font-bold'
                                                    : hisOrder?.order_id?.status === 4
                                                        ? 'text-green-600 bg-green-100 font-bold'
                                                        : ''
                                                    }`}
                                            >
                                                {hisOrder?.order_id?.status === 5 && "Đã hủy"}
                                                {hisOrder?.order_id?.status === 4 && "Đã hoàn thành"}
                                            </span>
                                        </div>
                                        <div>
                                            xóa
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 pb-2">
                                            <AppIcons.BuildingStorefront addClassNames="text-[#2563eb]" />
                                            <span>Nhà thuốc bình an dược</span>
                                        </div>
                                        <div className="flex items-center gap-3 pb-2">
                                            <AppIcons.ProductIcon />
                                            <span>Đơn thuốc giao hàng</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <AppIcons.BanknotesIcon addClassNames="" />
                                            <span>{formatsHelper.currency(hisOrder?.order_id
                                                ?.total_price
                                            )}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span>{formatsHelper.formatDate(hisOrder?.
                                                    createdAt)}{formatsHelper.FormatDateAndTime(hisOrder?.
                                                        createdAt)}</span>
                                            </div>
                                            <div>
                                                <Button addClassNames="text-[16px] text-[#fff] bg-[#2563EB] p-[10px] rounded-[10px] w-[150px] flex justify-center">
                                                    Đặt lại
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            ) : (
                <h1>Chưa có lịch sử đơn hàng</h1>
            )}

        </div>
    );
};

export default HistoryOrder;