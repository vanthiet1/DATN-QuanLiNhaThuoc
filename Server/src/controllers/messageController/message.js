const Message = require('../../models/messageModel/message');
const { getIo } = require('../../socket/socketManager');

const messageController = {
    getMessageUser: async (req, res) => {
        const { fromUserId, toUserId } = req.params;
        try {
            const messages = await Message.find({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            })
            .populate('productId')
            .sort({ timestamp: 1 })
            res.json(messages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deletetMessageUser: async (req, res) => {
        const {id} = req.params;
        try {
            const deletedMessage = await Message.findByIdAndDelete(id)
            if (!deletedMessage) {
                return res.status(404).json({ message: "Tin nhắn không tồn tại" });
            }
            const io = getIo();
            io.emit('messageDeleted', { id });
            res.json({ message: "Đã thu hồi" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = messageController;
