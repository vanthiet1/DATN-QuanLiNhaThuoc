const ProductModel = require('../../models/productModel/product');
const ImageProduct = require('../../models/imageModels/image');
const unorm = require('unorm');
const searchProduct = {
    searchProductKeyword: async (req, res) => {
        try {
            const { keyword } = req.query;
            const results = await ProductModel.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description_short: { $regex: keyword, $options: 'i' } }
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
    },

    searchProductQuery: async (req, res) => {
        const { q } = req.query;
        const normalizedQuery = unorm.nfd(q.trim()).replace(/[\u0300-\u036f]/g, "");
        try {
            const keywords = normalizedQuery.split(/\s+/).map(word => unorm.nfd(word).replace(/[\u0300-\u036f]/g, ''));
    
            const regexQueries = keywords.map(keyword => ({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description_short: { $regex: keyword, $options: 'i' } }
                ]
            }));
    
            const results = await ProductModel.find({
                $or: [
                    { name: { $regex: normalizedQuery, $options: 'i' } }, 
                    { description_short: { $regex: normalizedQuery, $options: 'i' } }, 
                    { name: { $regex: q, $options: 'i' } }, 
                    { description_short: { $regex: q, $options: 'i' } }, 
                    ...regexQueries 
                ]
            });
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
            res.status(500).json({ message: error.message });
        }
    }
    
    



}
module.exports = searchProduct;