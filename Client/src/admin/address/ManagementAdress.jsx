
import { useState, useEffect } from 'react';
import { TableAddressUser } from '../../components/ui/table/index.js';
// import userServices from '../../services/userService.js';
// import authServices from '../../services/authService.js';
import useFetch from '../../hooks/useFetch.js';
// import { handleDelete,handleIsActiveAccount ,handleUpdateRoleAccount } from './handle.js';
// import { useConfirmDialog } from "../../components/dialog/ConfirmDialogContext"; 
import addressServices from '../../services/addressService.js';

const ManagementAdress = () => {
    // const confirmDialog = useConfirmDialog();

    const titleRow = [
         "User",
        "Street",
        "Commune",
        "District",
        "City",
        "Address",
        "Receiver",
        "Phone",
    ];
    
    const { isLoading, isError, messsageError, responsData: initialAdressUserData } = useFetch(addressServices.getAllAddress);
    const [addressUser, setAddressUser] = useState([]);
    useEffect(() => {
        if (initialAdressUserData ) {
            setAddressUser(initialAdressUserData)
        }
    }, [initialAdressUserData]);
   console.log(addressUser);
   
    return (
        <div>
            <TableAddressUser
                addClassNames={'w-[100%]'}
                data={addressUser}
                titleRow={titleRow}
                // handleDelete={(id) => handleDelete(id, staffData, setStaffData, userServices.deleteUser,confirmDialog)}
                // handleIsActiveAccount={(id) => handleIsActiveAccount(id, userServices.getAllStaff, setStaffData, authServices.handleIsActiveAccount)}
             
            />
        </div>
    );
};

export default ManagementAdress;
