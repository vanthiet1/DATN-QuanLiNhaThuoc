import TableOrders from "../../../../components/ui/table/TableOrders";

const purchaseData = [
    {
        _id: "1",
        fullname: "Nguyễn Văn A",
        quantity: 2,
        bookTitle: "Sách Kinh Tế",
        price: 150000,
        totalPrice: 300000,
        status: "Đã hoàn tất",
        purchaseDate: "2024-10-01"
    },
    {
        _id: "2",
        fullname: "Trần Thị B",
        quantity: 1,
        bookTitle: "Lịch Sử Việt Nam",
        price: 200000,
        totalPrice: 200000,
        status: "Chưa hoàn tất",
        purchaseDate: "2024-10-02"
    },
];

const handleDelete = (id) => {
    console.log(`Hủy đơn với ID: ${id}`);
};

const YourOrders = () => {
    return (
        <div className="overflow-x-auto">
            <TableOrders
                data={purchaseData}
                addClassNames="my-custom-class w-full table-auto"
                titleRow={["Tên", "Số lượng", "Sách", "Giá", "Tổng Tiền", "Trạng thái", "Ngày Mua", "Hủy đơn"]}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default YourOrders;
