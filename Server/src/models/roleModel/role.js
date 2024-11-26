const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_Name: {
    type: String,
    equired: true,
    enum: ['admin', 'staff', 'customer']
  }
});

const RoleModal = mongoose.model('Role', roleSchema);
module.exports = RoleModal;
