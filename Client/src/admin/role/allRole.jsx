import TableRole from "../../components/ui/table/TableRole";
import useFetch from "../../hooks/useFetch";
import roleServices from "../../services/roleService";
const allRole = () => {
    const titleRow = [
        "Name Role",
        "Acction"
    ];
    const { responsData: roleData} = useFetch(roleServices.getAllRole)
    console.log(roleData);
    
    return (
        <div>
            <TableRole
                titleRow={titleRow}
                data={roleData}
            />
        </div>
    );
};

export default allRole;