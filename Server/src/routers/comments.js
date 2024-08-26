const router = require("express").Router();
const commentController = require('../controllers/commentsController/comments');;

router.get("/", commentController.getAllComments);
router.post("/:id", commentController.addComment);
router.get("/:id", commentController.getCommentsByProductId);
router.delete("/:id", commentController.deleteComment);
router.put("/:id", commentController.updateComment);


module.exports = router;