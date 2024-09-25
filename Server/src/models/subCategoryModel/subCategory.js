const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    description: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
