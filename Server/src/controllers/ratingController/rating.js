const RatingVote = require('../../models/ratingVoteModel/ratingVote')

const RatingController = {
    createRatingProduct: async (req, res) => {
        try {
            const { productId, rating, userId } = req.body;
            const newVote = new RatingVote({ productId, rating, userId });
            await newVote.save();
            res.status(201).json(newVote);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getStarVotes: async (req, res) => {
        try {
          const { productId } = req.params;
          const votes = await StarVote.find({ productId });
          res.status(200).json(votes);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
      getAverageRating: async (req, res) => {
        try {
          const { productId } = req.params;
          const average = await StarVote.aggregate([
            { $match: { productId: mongoose.Types.ObjectId(productId) } },
            { $group: { _id: null, avgRating: { $avg: '$rating' } } },
          ]);
          res.status(200).json(average.length > 0 ? average[0].avgRating : 0);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
}
module.exports = RatingController