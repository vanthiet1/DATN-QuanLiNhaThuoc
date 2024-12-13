const Router = require('express').Router();
const ChatController = require('../controllers/streamChatController/chatController');
Router.post('/', ChatController.chat);
module.exports = Router;
