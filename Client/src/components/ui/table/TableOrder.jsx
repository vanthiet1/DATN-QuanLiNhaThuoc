import { cn } from "../../../utils/helpers/mergeClasses";
import formatsHelper from "../../../utils/helpers/formats";
import { Button } from "../button";
const TableOrder = ({
    data,
    addClassNames,
    titleRow,
    titleRowOrderDetail,
    handleCancelOrder,
    checkOrderDetail,
    orderDetailProduct,
    expandedOrderId
}) => {
    return (
        <table className={cn(`w-full text-left table-auto border-collapse shadow-md bg-white mb-5 rounded-[5px] ${addClassNames}`)}>
            <thead>
                <tr className={cn(`border-b rounded-[5px] border-gray-300 text-white bg-blue-600`)}>
                    {titleRow && titleRow.map((title, index) => (
                        <th key={index} className='p-3 w-max font-normal3 text-[#fff]'>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? (
                    data.map((order) => (
                        <>
                            <tr key={order._id} className="border-b border-gray-300 hover:bg-gray-50">
                                <td className="p-2">{order?.total_quantity}</td>
                                <td className="p-2">{formatsHelper.currency(order?.total_price)}</td>
                                <td className={`p-2 ${order?.status === 1 ? "text-yellow-600 font-bold" : "text-[#333]"}`}>
                                    {order?.status === 1 && "Đang xử lí"}
                                </td>
                                <td className="p-2">{formatsHelper.formatDate(order?.createdAt)}</td>
                                <td className="p-2">
                                {order?.isPay ? <span className="text-green-600 font-bold">Đã thanh toán</span>: <span className="text-red-500 font-bold">Chưa thanh toán</span>}
                                </td>
                                <td className="p-2">
                                    <Button
                                        addClassNames="bg-red-500 text-[#fff] text-[16px] rounded-[7px] px-3 py-2 w-[90px] flex justify-center cursor-pointer"
                                        onClick={() => handleCancelOrder(order._id)}
                                    >
                                        Hủy
                                    </Button>
                                </td>
                                <td className="p-2">
                                    <Button
                                        addClassNames="bg-[#2563EB] text-[#fff] text-[16px] rounded-[7px] px-3 py-2 w-full flex justify-center cursor-pointer"
                                        onClick={() => checkOrderDetail(order._id)}
                                    >
                                        {expandedOrderId === order._id ? "Ẩn" : "Xem"}
                                    </Button>
                                </td>
                            </tr>
                            {expandedOrderId === order._id && (
                                <tr className="bg-gray-50">
                                    <td colSpan={titleRow.length}>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    {titleRowOrderDetail &&
                                                        titleRowOrderDetail.map((title, index) => (
                                                            <th key={index} className="p-3 w-max font-normal3 text-[#333]">
                                                                {title}
                                                            </th>
                                                        ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDetailProduct?.map((detailProduct) => (
                                                    <tr key={detailProduct._id} className="border-b border-gray-300">
                                                        <td className="p-2">
                                                            <img
                                                                className="w-[50px]"
                                                                src={detailProduct?.images[0]?.url_img}
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td className="p-2">{detailProduct?.product?.name}</td>
                                                        <td className="p-2">{formatsHelper.currency(detailProduct?.price)}</td>
                                                        <td className="p-2">{detailProduct?.quantity}</td>
                                                        <td className="p-2">
                                                            {formatsHelper.formatDate(detailProduct?.createdAt)} -{" "}
                                                            {formatsHelper.FormatDateAndTime(detailProduct?.createdAt)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))
                ) : (
                    <tr>
                        <td colSpan={titleRow?.length || 1} className="text-center p-4 text-gray-500">
                            Tạm thời chưa có đơn hàng nào
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TableOrder;
