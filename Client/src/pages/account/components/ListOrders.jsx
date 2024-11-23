import { useContext, useEffect, useState } from "react";
import { TableOrder } from "../../../components/ui/table/index";
import orderServices from "../../../services/orderService";
import orderDetailsServices from "../../../services/orderDetailsService";
import { UserContext } from "../../../contexts/UserContext";
const YourOrders = () => {
    const [orderProduct, setOrderProduct] = useState([]);
    const [orderDetailProduct, setOrderDetailProduct] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const { user } = useContext(UserContext);
    const handleCancelOrder = (id) => {
        console.log(`Hủy đơn với ID: ${id}`);
    };
    const getDataOrder = async () => {
        const dataOrder = await orderServices.getOrderByUserId(user?._id);
        const filteredOrders = dataOrder?.filter(order => order.status === 1);
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
                titleRow={["Số lượng sản phẩm", "Tổng Tiền", "Trạng thái đơn hàng", "Ngày Mua", "Hủy đơn", "Xem đơn hàng"]}
                titleRowOrderDetail={["Ảnh","Tên sản phẩm", "giá tiền","Số lượng","Ngày Mua"]}
                handleCancelOrder={handleCancelOrder}
                checkOrderDetail={checkOrderDetail}
                expandedOrderId={expandedOrderId}
            />
        </div>
    );
};

export default YourOrders;