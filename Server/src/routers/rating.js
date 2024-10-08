const express = require('express');
const router = express.Router();
const starVoteController = require('../controllers/ratingController/rating');

router.post('/', starVoteController.createRatingProduct);
router.get('/:productId', starVoteController.getStarVotes);
router.get('/average/:productId', starVoteController.getAverageRating);

module.exports = router;