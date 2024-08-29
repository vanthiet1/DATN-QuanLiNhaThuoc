const AddressModel = require('../../models/addressModel/address');
const mongoose = require('mongoose')
const AddressController = {
    addAddress: async (req, res) => {
        const { street, commune, district, city, address, receiver, phone, user_id } = req.body;
        if (!street || !commune || !district || !city || !address || !receiver || !phone) {
            return res.status(400).json({ message: 'Cần phải nhập đầy đủ thông tin.' });
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'User không tồn tại' });
        }
        try {
            const newAddress = new AddressModel({
                street,
                commune, //phường / xã
                district, // quận / huyện
                city, // thành phố // tỉnh
                address, // gộp lại
                receiver, // người nhận hộ
                phone,//sdt
                user_id,

            });

            await newAddress.save();
            res.status(201).json({
                message: 'Địa chỉ mới đã được tạo thành công.',
                address: newAddress
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAddress: async (req, res) => {
        try {
            const addresses = await AddressModel.find().populate('user_id', 'name');
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách địa chỉ: ' + error.message });
        }
    },

    getAddressByUserId: async (req, res) => {
        try {
            const { user_id } = req.params
            if (!user_id) {
                return res.status(400).json({ message: 'Thiếu thông tin user' });
            }
            const address = await AddressModel.findOne({ user_id: user_id }).populate('user_id');
            if (!address) {
                return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
            }
            res.status(200).json(address);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAddressById: async (req, res) => {
        try {
            const { id } = req.params;
            const address = await AddressModel.findById(id).populate('user_id');
            if (!address) {
                return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
            }
            res.status(200).json(address);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateAddress: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                street,
                commune, //phường / xã
                district, // quận / huyện
                city, // thành phố // tỉnh
                address, // gộp lại
                receiver, // người nhận hộ
                phone,//sdt
                user_id
            } = req.body;
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                return res.status(400).json({ message: 'User không tồn tại' });
            }
            const updatedAddress = await AddressModel.findByIdAndUpdate(
                id,
                { district, commune, address, user_id, receiver, city, phone, street },
                { new: true }
            );
            if (!updatedAddress) {
                return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
            }
            res.status(200).json({
                message: 'Địa chỉ đã được cập nhật thành công.',
                address: updatedAddress
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteAddress: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedAddress = await AddressModel.findByIdAndDelete(id);
            if (!deletedAddress) {
                return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
            }
            res.status(200).json({ message: 'Xóa địa chỉ thành công' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = AddressController;
