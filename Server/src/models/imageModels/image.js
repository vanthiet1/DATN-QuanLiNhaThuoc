const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
    url_img: { type: String, required: true },
  },
  { timestamps: true }
);

const ImagesModel = mongoose.model('Images', orderSchema);

module.exports = ImagesModel;
