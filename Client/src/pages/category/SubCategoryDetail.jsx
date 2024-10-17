import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { SpinnerLoading } from '../../components/ui/loaders';
import CardProduct from '../../components/card/CardProduct';
import formatsHelper from '../../utils/helpers/formats';
import subCategoryServices from '../../services/subCategoryService';

const CategoryDetails = () => {
    const { id } = useParams(); 

    const { responsData, isLoading } = useFetch(
        () => subCategoryServices.getProductBySubCategory(id),
        {},
        [id]
    );

    if (isLoading) {
        return (
            <div className="flex justify-center pt-[50px]">
                <SpinnerLoading />
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-4 gap-5">
                {responsData?.length > 0 ? (
                    responsData.map((product) => (
                        <CardProduct
                            key={product?._id}
                            image={
                                product?.images?.[0]?.url_img
                            }
                            name={product?.name || "Sản phẩm không có tên"}
                            description_short={product?.description_short || "Không có mô tả"}
                            priceNew={formatsHelper.currency(product?.price_distcount || 0)}
                            priceOld={formatsHelper.currency(product?.price_old || 0)}
                            detail={`/product/${product?.slug || "#"}`}
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
