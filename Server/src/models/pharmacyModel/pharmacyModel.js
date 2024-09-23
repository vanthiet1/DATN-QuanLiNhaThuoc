const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    phone_number: {
      type: Number,
      required: true
    },
    opening_hours: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const PharmacyModel = mongoose.model('pharmacy', pharmacySchema);
module.exports = PharmacyModel;
