const Router = require('express').Router()
const WebhookController = require('../controllers/webhookController/webhookController');
Router.post('/casso', WebhookController.handleWebhook)
module.exports = Router