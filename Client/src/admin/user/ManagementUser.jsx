import { useState , useEffect } from 'react';
import { TableManagerAccount } from '../../components/ui/table/index.js'
import userServices from '../../services/userService.js';
import useFetch from '../../hooks/useFetch.js';
import { showToastError, showToastSuccess } from '../../configs/toastConfig.js';
const ManagementUser = () => {
    const titleRow = [
        "Full name",
        "Email",
        "Provider",
        "Status",
        "Date created",
        "Role",
        "Action"
    ]
    const { isLoading, isError, responsData: initialUserData, messsageError } = useFetch(userServices.getAllUser);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        if (initialUserData) {
          setUserData(initialUserData);
        }
      }, [initialUserData]);
    const handleDelete = async (id)=>{
     if(!id){
        return showToastError("Không tìm thấy user")
     }
        const response = await userServices.deleteUser(id)
        if(response){
            const updatedUserData = userData.filter(user => user._id !== id);
            setUserData(updatedUserData)
             showToastSuccess(response.message || "Xóa thành công")
        }else{
            showToastError(response.message || "Xóa thất bại " );
        }  
    }
    return (
        <div>
            <TableManagerAccount
                addClassNames={'w-[100%]'}
                data={userData}
                titleRow={titleRow}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default ManagementUser;