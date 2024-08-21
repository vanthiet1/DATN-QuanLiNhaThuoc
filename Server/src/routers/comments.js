const router = require("express").Router();
const commentController = require('../controllers/commentsController/comments');

router.post("/:id", commentController.addComment);
router.get("/:id", commentController.getCommentsByProductId);
router.get("/comments", commentController.getAllComments);
router.delete("/:id", commentController.deleteComment);

module.exports = router;