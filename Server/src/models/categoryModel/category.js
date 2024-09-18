const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
