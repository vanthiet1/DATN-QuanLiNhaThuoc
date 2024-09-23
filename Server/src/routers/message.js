const router = require('express').Router()
const messageController = require('../controllers/messageController/message');

router.get('/:fromUserId/:toUserId' ,messageController.getMessageUser);

router.delete('/:id' ,messageController.deletetMessageUser);


module.exports = router;
