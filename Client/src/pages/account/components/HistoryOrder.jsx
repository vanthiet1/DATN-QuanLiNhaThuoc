import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import AppIcons from '../../../components/ui/icon/index'
import { PATH_ROUTERS_CLIENT } from "../../../utils/constant/routers";
import historyOrderServices from "../../../services/historyOrderServices";
import { UserContext } from "../../../contexts/UserContext";
import formatsHelper from "../../../utils/helpers/formats";
import { SpinnerLoading } from "../../../components/ui/loaders";
import { useConfirmDialog } from "../../../components/dialog/ConfirmDialogContext";
import { showToastSuccess } from "../../../configs/toastConfig";

const HistoryOrder = () => {
    const { user } = useContext(UserContext);
    const [hisOrderUser, setHisOrderUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const confirmDialog = useConfirmDialog();

    const getDataHistoryOrder = async () => {
        try {
            setIsLoading(true);
            const dataHisOrder = await historyOrderServices.getAllHistoryOrders();
            const filteredHistoryOrders = dataHisOrder?.data?.filter(
                (hisOrder) => hisOrder?.order_id?.user_id === user?._id
            );
            setHisOrderUser(filteredHistoryOrders || []);
        } catch (error) {
            console.error("Lỗi khi tải lịch sử đơn hàng:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const deleteDataHistoryOrder = async (id) => {
        if (!id) return;
        const result = await confirmDialog({
            title: 'Xóa sản phẩm',
            message: 'Bạn có muốn xóa lịch sử đặt hàng đơn này không?',
            confirmLabel: 'Xóa',
            cancelLabel: 'Hủy'
          })
          if(result){
            const dataHisOrder = await historyOrderServices.deleteHistoryOrder(id);
            console.log(dataHisOrder);
            
            const filteredHistoryOrders = hisOrderUser?.filter(
                (hisOrder) => hisOrder?.order_id?._id === dataHisOrder?.data?._id
            );
            setHisOrderUser(filteredHistoryOrders);
            showToastSuccess(dataHisOrder?.message)
          }
    };

    useEffect(() => {
        getDataHistoryOrder();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center h-[250px]">
                    <SpinnerLoading />
                </div>
            ) : hisOrderUser && hisOrderUser.length > 0 ? (
                <div className="h-[600px] overflow-x-auto">
                    {hisOrderUser.map((hisOrder) => (
                        <div className="shadow p-5 rounded-md" key={hisOrder?.order_id?._id}>
                            <div className="px-5  ">
                                <div className="flex justify-between items-center">
                                    <Link to={`/lich-su-dat-hang/${hisOrder?.order_id?._id}`}>
                                        <div className="flex gap-2 items-center pb-3">
                                            <span className="block font-semibold">Đơn hàng {hisOrder?.order_id?._id}</span>
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
                                    </Link>
                                    <div onClick={()=>deleteDataHistoryOrder(hisOrder?._id)} className=" text-[#EF4444] w-[100px] p-2 rounded-[6px] text-center font-semibold cursor-pointer">xóa</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 pb-2">
                                        <AppIcons.BuildingStorefront />
                                        <span>Nhà thuốc bình an dược</span>
                                    </div>
                                    <div className="flex items-center gap-3 pb-2">
                                        <AppIcons.ProductIcon />
                                        <span>Đơn thuốc giao hàng</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <AppIcons.BanknotesIcon />
                                        <span>{formatsHelper.currency(hisOrder?.order_id?.total_price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span>
                                                {formatsHelper.formatDate(hisOrder?.createdAt)}{" "}
                                                {formatsHelper.FormatDateAndTime(hisOrder?.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1 className="text-center">Chưa có lịch sử đơn hàng</h1>
            )}
        </div>
    );
};

export default HistoryOrder;
