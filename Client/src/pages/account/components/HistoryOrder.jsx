import { Button } from "../../../components/ui/button";
import AppIcons from '../../../components/ui/icon/index'
import { Link } from "react-router-dom";

const HistoryOrder = () => {
    return (
        <div className=" shadow p-5 rounded-md">
            <div className="px-5 cursor-pointer">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center pb-3">
                        <span className="block font-semibold">Đơn 734W559B </span>
                        <span className="text-red-500 bg-[#FFE7E9] p-1 w-[90px] flex justify-center rounded-[7px]">Đã hủy</span>
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
                        <span>300000vnd</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <span>05/11/2024</span>
                        </div>
                        <div>
                            <Button addClassNames="text-[16px] text-[#fff] bg-[#2563EB] p-[10px] rounded-[10px] w-[150px] flex justify-center">
                                Đặt lại
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryOrder;