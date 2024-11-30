import { useContext, useEffect, useState } from "react";
import { TableOrder } from "../../../components/ui/table/index";
import orderServices from "../../../services/orderService";
import orderDetailsServices from "../../../services/orderDetailsService";
import { UserContext } from "../../../contexts/UserContext";
import { showToastError } from "../../../configs/toastConfig";
import { useConfirmDialog } from "../../../components/dialog/ConfirmDialogContext";
const YourOrders = () => {
    const [orderProduct, setOrderProduct] = useState([]);
    const [orderDetailProduct, setOrderDetailProduct] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const { user } = useContext(UserContext);
    const  confirmDialog = useConfirmDialog();
    const handleCancelOrder = async (id) => {
        if(!id){
            return showToastError("Đơn hàng của bạn không có hoặc đã bị hủy trước đó")
        }
        const result = await confirmDialog({
            title: 'Hủy đơn hàng',
            message: 'Bạn có thực sự muốn hủy đơn hàng này không?',
            confirmLabel: 'Xác Nhận Hủy Đơn Hàng',
            cancelLabel: 'Suy Nghĩ Lại',
          });
          if(result){
            const orderUpdate = await orderServices.updateOrder(id,{status:5})
            if (orderUpdate?.status === 5) {
                const updatedOrders = orderProduct.filter(
                    (productCancel) => productCancel._id !== id
                );
                setOrderProduct(updatedOrders);
            } else {
                showToastError("Không thể hủy đơn hàng. Vui lòng thử lại.");
            }
          }
    };
    const getDataOrder = async () => {
        const dataOrder = await orderServices.getOrderByUserId(user?._id);
        const filteredOrders = dataOrder?.filter(order => [1,2,3].includes(order.status));
        setOrderProduct(filteredOrders || []);
    };
    useEffect(() => {
        getDataOrder();
    }, [user?._id]);
    const checkOrderDetail = async (id) => {
        setExpandedOrderId(prev => (prev === id ? null : id));
        const dataOrderDetail = await orderDetailsServices.getOrderDetailByOrderId(id);
        setOrderDetailProduct(dataOrderDetail);
    }
    return (
        <div className="overflow-x-auto">
            <TableOrder
                data={orderProduct}
                orderDetailProduct={orderDetailProduct}
                addClassNames="my-custom-class w-full table-auto"
                titleRow={["Số lượng sản phẩm", "Tổng Tiền", "Trạng thái đơn hàng", "Ngày Mua", "Thanh toán","Hủy đơn", "Xem đơn hàng"]}
                titleRowOrderDetail={["Ảnh","Tên sản phẩm", "giá tiền","Số lượng","Ngày Mua"]}
                handleCancelOrder={handleCancelOrder}
                checkOrderDetail={checkOrderDetail}
                expandedOrderId={expandedOrderId}
            />
        </div>
    );
};

export default YourOrders;