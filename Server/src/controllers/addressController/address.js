const AddressModel = require('../../models/addressModel/address');

const AddressController = {
    createAddress: async (req, res) => {
        const { district, commune, address, user_id, receiver, city, phone } = req.body;
        try {
            const newAddress = new AddressModel({
                district,
                commune,
                address,
                user_id,
                receiver,
                city,
                phone
            });
            await newAddress.save();
            res.status(201).json({
                message: 'Địa chỉ mới đã được tạo thành công.',
                address: newAddress
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo địa chỉ: ' + error.message });
        }
    },

    getAddresses: async (req, res) => {
        try {
            const addresses = await AddressModel.find().populate('user_id');
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách địa chỉ: ' + error.message });
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
            const { district, commune, address, user_id, receiver, city, phone } = req.body;

            const updatedAddress = await AddressModel.findByIdAndUpdate(
                id,
                { district, commune, address, user_id, receiver, city, phone },
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
            res.status(200).json({ message: 'Địa chỉ đã bị xóa' });
        } catch (error) {
            res.status(500).json({ message:error.message });
        }
    }
};

module.exports = AddressController;
