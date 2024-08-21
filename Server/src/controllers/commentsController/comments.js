const Comment = require('../../models/commentsModel/comments');

const commentController = {
    addComment: async (req, res) => {
        try {
            const { content, user_id, product_id } = req.body;
            const newComment = new Comment({ content, user_id, product_id });
            await newComment.save();

            // Thêm comment vào danh sách comments của product
            await Product.findByIdAndUpdate(product_id, { $push: { comments: newComment._id } });

            res.status(201).json({ message: '', comment: newComment });
        } catch (error) {
            console.error('', error);
            res.status(500).json({ error: '' });
        }
    },

    getCommentsByProductId: async (req, res) => {
        try {
            const { id } = req.params;
            const comments = await Comment.find({ product_id: id }).populate('product_id');
            if (!comments || comments.length === 0) {
                return res.status(404).json({ error: "Không tìm thấy bình luận" });
            }
            res.json(comments);
        } catch (error) {
            console.error('', error);
            res.status(500).json({ error: '' });
        }
    },

    getAllComments: async (req, res) => {
        try {
            const allComments = await Comment.find();
            if (!allComments || allComments.length === 0) {
                return res.status(404).json({ error: "" });
            }
            res.status(200).json(allComments);
        } catch (error) {
            console.error('', error);
            res.status(500).json({ error: '' });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;
            const comment = await Comment.findById(id);
            if (!comment) {
                return res.status(404).json({ error: '' });
            }
            await Comment.findByIdAndDelete(id);

            const productId = comment.product_id;
            await Product.findByIdAndUpdate(productId, { $pull: { comments: id } });

            res.status(200).json({});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = commentController;
