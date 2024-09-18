const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId;
            },
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        avatar: {
            type: String,
        },
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        },
        emailVerify: {
            type: Boolean,
            default: false,
            require: true
        },
        phone: {
            type: Number,
        },
        is_active: {
            type: Number,
            default: 0,
            required: true
        },
        provider: {
            type: String,
            enum: ['google', 'facebook', 'phone', 'local'],
            required: true
        },
        otpVerify: { type: Number },
        otpForgotPass: { type: String },
        timeOtp: { type: Date }
    }, {
    timestamps: true,
}
)
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel