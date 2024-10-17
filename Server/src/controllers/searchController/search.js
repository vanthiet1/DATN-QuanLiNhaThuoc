const ProductModel = require('../../models/productModel/product');
const ImageProduct = require('../../models/imageModels/image');

const searchProduct = {
    searchProduct: async (req, res) => {
        try {
            const { keyword } = req.query;
            const results = await ProductModel.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                ]
            })
            const productsWithImages = await Promise.all(
                results.map(async (product) => {
                    const images = await ImageProduct.find({ product_id: product._id });
                    return {
                        ...product.toObject(),
                        images,
                    };
                })
            );
            res.json(productsWithImages);
        } catch (error) {
            res.status(500).json({ message: "Không tìm thấy" })
        }
    }



}
module.exports = searchProduct;