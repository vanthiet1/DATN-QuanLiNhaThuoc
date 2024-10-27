const Router = require('express').Router();
const TransactionController = require('../controllers/transactionController/transactioncontroller');

Router.get('/', TransactionController.getAllTransactions);
Router.get('/:id', TransactionController.getTransactionById);

module.exports = Router;
