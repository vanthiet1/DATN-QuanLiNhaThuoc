const Router = require('express').Router();
const HistoryOrderController = require('../controllers/historyOrderController/historyOrderController');

Router.get('/', HistoryOrderController.getAllHistoryOrders);
Router.post('/', HistoryOrderController.createHistoryOrder);
Router.get('/:id', HistoryOrderController.getHistoryByOrderId);
Router.delete('/:id', HistoryOrderController.deleteHistoryOrder);

module.exports = Router;
