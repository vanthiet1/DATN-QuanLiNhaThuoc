const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    origin_country: {
      type: String,
      require: true
    },
    country_made: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);
const BrandModel = mongoose.model('Brand', BrandSchema);
module.exports = BrandModel;
