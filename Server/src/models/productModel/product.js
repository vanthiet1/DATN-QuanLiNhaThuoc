const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'subcategories'
    },
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    description_short: {
      type: String,
      required: true
    },
    price_old: {
      type: Number,
      required: true
    },
    price_distcount: {
      type: Number,
      required: true
    },
    percent_price: {
      type: Number,
      required: true,
      default: 0
    },
    stock: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    production_date: {
      type: Date
    },
    expiration_date: {
      type: Date
    }
  },
  { timestamps: true }
);

const Products = mongoose.model('Products', ProductSchema);
module.exports = Products;
