import TableRole from "../../components/ui/table/TableRole";
import useFetch from "../../hooks/useFetch";
import roleServices from "../../services/roleService";
import { useConfirmDialog } from "../../components/dialog/ConfirmDialogContext";
import AppIcons from '../../components/ui/icon';
import { useNavigate } from "react-router-dom";

const allRole = () => {
    const titleRow = [
        "Name Role",
        "Acction"
    ];
    const { responsData: roleData} = useFetch(roleServices.getAllRole)
    const confirmDialog = useConfirmDialog();
    const navigate = useNavigate()

    const handleDetele = async (role) => {
        
        const result = await confirmDialog({
          title: 'Xóa role',
          iconLeft: <AppIcons.TrashBinIcon />,
          message: `Bạn có muốn xóa role ${role.role_Name} không ?`,
          confirmLabel: 'Có, tôi đồng ý',
          cancelLabel: 'Không, giữ lại'
        });
        if (result) {
          await roleServices.deleteRoleById(role._id);
          window.location.reload()
        }
       
      };
      const handleEdit = async (idRole)=>{
          console.log(idRole);
          navigate(`/admin/edit-role/${idRole}`);
      }
    return (
        <div>
            <TableRole
               handleEdit={handleEdit}
                titleRow={titleRow}
                data={roleData}
                handleDetele={handleDetele}
            />
        </div>
    );
};

export default allRole;