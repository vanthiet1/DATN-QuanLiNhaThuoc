const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    require: true
  },
  district: {
    type: String,
    require: true
  },
  province: {
    type: String,
    require: true
  },
  ward: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  user_id: {
    type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  note: {
    type: String,
    require: true
  }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
