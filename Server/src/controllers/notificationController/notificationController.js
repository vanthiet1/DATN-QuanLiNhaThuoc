const NotificationModel = require('../../models/notificationModel/notificationModel');

const NotificationController = {
  getAllNotification: async (req, res) => {
    try {
      const notification = await NotificationModel.find();
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateNotification: async (req, res) => {
    try {
      const { id } = req.params;

      const notificationExist = await NotificationModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
      if (!notificationExist) {
        res.status(400).json({ message: 'không tìm thấy id notification' });
      }

      res.status(200).json({
        Updatenotification: notificationExist
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteNotification: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteNotification = await NotificationModel.findByIdAndDelete(id);
      if (!deleteNotification) {
        return res.status(404).json({ message: 'Không tìm thấy notification' });
      }
      res.status(200).json({ message: 'notification đã bị xóa' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa notification: ' + error.message });
    }
  }
};

module.exports = NotificationController;
