import { showToastError , showToastSuccess } from "../../configs/toastConfig";

export const handleDelete = async (id, data, setData, deleteService) => {
    if (!id) {
        return showToastError("Không tìm thấy người dùng");
    }
    const response = await deleteService(id);
    if (response) {
        const updatedData = data.filter(item => item._id !== id);
        setData(updatedData);
        showToastSuccess(response.message || "Xóa thành công");
    } else {
        showToastError(response.message || "Xóa thất bại");
    }
};

export const handleIsActiveAccount = async (id, getService, setData, updateService) => {
    if (!id) return;
    const responseData = await updateService(id);
    if (responseData) {
        showToastSuccess(responseData.message);

        const updatedData = await getService();
        if (updatedData) {
            setData(updatedData);  
        }
    } else {
        showToastError("Thay đổi trạng thái thất bại");
    }
};
