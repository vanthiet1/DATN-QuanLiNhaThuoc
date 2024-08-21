const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        role_Name: {
            type: String,
            equired: true,
        },
    }
)

const RoleModal = mongoose.model('Role', roleSchema);
module.exports = RoleModal