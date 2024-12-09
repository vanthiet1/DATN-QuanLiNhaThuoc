const Router = require('express').Router();
const NotificationController = require('../controllers/notificationController/notificationController');
Router.get('/', NotificationController.getAllNotification);
Router.put('/:id', NotificationController.updateNotification);
Router.delete('/:id', NotificationController.deleteNotification);

module.exports = Router;
