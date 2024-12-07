import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import { SpinnerLoading } from '../../components/ui/loaders';
import CardProduct from '../../components/card/CardProduct';
import subCategoryServices from '../../services/subCategoryService';
import { UserContext } from '../../contexts/UserContext';
import { HandleCartContext } from '../../contexts/HandleCartContext';
import useSrcollTop from '../../hooks/useSrcollTop';
const CategoryDetails = () => {
    const { id } = useParams(); 
    useSrcollTop(id)
    const {user} = useContext(UserContext)

    const { responsData, isLoading } = useFetch(
        () => subCategoryServices.getProductBySubCategory(id),
        {},
        [id]
    );
const {handleAddToCart} = useContext(HandleCartContext)

 
    if (isLoading) {
        return (
            <div className="flex justify-center pt-[50px]">
                <SpinnerLoading />
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-4 gap-5 max-md:grid-cols-1">
                {responsData?.length > 0 ? (
                    responsData.map((product) => (
                        <CardProduct
                               products={product}
                               handleAddToCart={()=>handleAddToCart(product?._id,user?._id,true)}
                        />
                    ))
                ) : (
                    <div className="col-span-4 flex items-center justify-center w-full h-full">
                        <p className="pt-5 text-center">Không có sản phẩm nào trong danh mục này.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;
