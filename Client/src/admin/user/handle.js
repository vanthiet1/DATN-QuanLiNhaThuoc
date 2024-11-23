import { showToastError, showToastSuccess } from "../../configs/toastConfig";
export const handleDelete = async (id, data, setData, deleteService, confirmDialog) => {
    if (!id) {
        return showToastError("Không tìm thấy người dùng");
    }

    const result = await confirmDialog({
        title: 'Xóa tài khoản',
        message: `Bạn có muốn xóa tài khoản này không?`,
        confirmLabel: 'Có, tôi đồng ý',
        cancelLabel: 'Không, giữ lại'
    });

    if (result) {
        const response = await deleteService(id);
        if (response) {
            const updatedData = data.filter(item => item._id !== id);
            setData(updatedData);
            showToastSuccess(response.message || "Xóa thành công");
        } else {
            showToastError(response.message || "Xóa thất bại");
        }
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


export const handleUpdateRoleAccount = async (idUser, idRole, handleUpdateRole,setChange ) => {
    if (!idUser || !idRole) {
        return showToastError("Không tìm được id user hoặc role")
    }
    const response = await handleUpdateRole(idUser, { role_id: idRole });
    setChange(response?.user)
    if (response) {
        const updatedData = roleData.map(item =>
            item._id === idUser ? { ...item, role_id: { ...item.role_id, _id: idRole } } : item
        );
         console.log('updatedData',updatedData);
    } else {
        showToastError(response.message || "Cập nhật thất bại");
    }

}
