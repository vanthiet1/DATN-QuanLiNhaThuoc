const Router = require('express').Router();
const commentController = require('../controllers/commentsController/comments');

Router.get('/', commentController.getAllComments);
Router.post('/:id', commentController.addComment);
Router.get('/:id', commentController.getCommentsByProductId);
Router.delete('/:id', commentController.deleteComment);
Router.put('/:id', commentController.updateComment);
Router.get('/1/:id', commentController.getWithId);

module.exports = Router;
