const ImageModel = require("../../models/imageModels/image");


const createImage = async (req, res) => {
    const {product_id, url_img} = req.body
    try {
        const image = new ImageModel({product_id, url_img}); 
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getImages = async (req, res) => {
    try {
        const images = await ImageModel.find().lean();             //.populate('product_id'); 
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getImageById = async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params.id).populate('product_id'); 
        if (!image) return res.status(404).json({ message: 'image not found' });
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateImage = async (req, res) => {
    try {
        const image = await ImageModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!image) return res.status(404).json({ message: 'image not found' });
        res.status(200).json(image);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteImage = async (req, res) => {
    try {
        const image = await ImageModel.findByIdAndDelete(req.params.id); 
        if (!image) return res.status(404).json({ message: 'image not found' });
        res.status(200).json({ message: 'image deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createImage,
    getImages,
    getImageById,
    updateImage,
    deleteImage
};