import { Link } from "react-router-dom";
import categoryServices from "../../services/categoryService";
import useFetch from '../../hooks/useFetch'
import AppIcons from '../ui/icon';


const Navigation = () => {
    const { isLoading, isError, messsageError, responsData: initialCategoryData } = useFetch(categoryServices.getCategory);
    console.log(initialCategoryData);

    return (
        <div className=" border-1 w-[100%]  p-4 shadow">
            <div className=" flex justify-between items-center gap-2 w-[90%] m-auto">
                {initialCategoryData && initialCategoryData.map((category) => (
                    <div className="flex items-center group relative" key={category._id}>
                        <Link>
                            <span className="w-max cursor-pointer hover:text-[#2563EB] duration-200 text-[15px] font-semibold">{category?.name}</span>
                        </Link>
                        {category.subcategories && category.subcategories.length > 0 && (
                            <div className="ml-3">
                            <AppIcons.ArrowDown 
        addClassNames="inline-block ml-1 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#2563EB]" 
    />
                                <div className=" hidden max-h-0 overflow-hidden group-hover:max-h-[500px] duration-500 group-hover:duration-500  group-hover:block absolute bg-[#fff] w-[250px] left-[-5px] shadow p-4">
                                    {category.subcategories.map((sub) => (
                                        <Link to={'/'} key={sub.id}>
                                            <span className="block py-2 text-sm text-gray-600 hover:text-[#2563EB] w-max font-bold">
                                                {sub?.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Navigation;