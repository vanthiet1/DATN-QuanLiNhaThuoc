const Comment = require('../../models/commentsModel/comments');
const Product = require('../../models/productModel/product')

const commentController = {
    addComment: async (req, res) => {
        try {
            const { id } = req.params  // id => id sp
            const { content, user_id } = req.body;
            if (!content || !user_id || !id ) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            const newComment = new Comment({ content, user_id, product_id:id });
            await newComment.save();
            res.status(201).json(newComment);
        } catch (error) {
            console.error('', error);
            res.status(500).json({ error: '404' });
        }
    },

    getCommentsByProductId: async (req, res) => {
        try {
            const { id } = req.params;
            const comments = await Comment.find({ product_id: id })
            if (!comments || comments.length === 0) {
                return res.status(404).json({ error: "Không tìm thấy bình luận" });
            }
            res.json(comments);
        } catch (error) {
            console.error('', error);
            res.status(500).json({ error: '1' });
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
            const { userId } = req.body;
    
            const deleteComment = await Comment.findById(id);
    
            if (!deleteComment) {
                return res.status(404).json({ error: 'Bình luận không tồn tại' });
            }
    
            if (userId !== deleteComment.user_id.toString()) {
                return res.status(403).json({ error: 'Bạn không thể xóa bình luận của người khác' });
            }
    
            await Comment.findByIdAndDelete(id);
    
            res.status(200).json({ message: 'Đã xóa bình luận' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    
    updateComment: async (req, res) => {
        try {
            const { id } = req.params;
            const { content, user_id } = req.body;
            const userComment = await Comment.findById(id);
    
            if (!userComment) {
                return res.status(404).json({ error: 'Bình luận không tồn tại' });
            }
    
            if (user_id !== userComment.user_id.toString()) {
                return res.status(403).json({ error: 'Bạn không thể sửa bình luận của người khác' });
            }
    
            const updateComment = await Comment.findByIdAndUpdate(
                id,
                { content }, 
                { new: true } 
            );
    
            if (!updateComment) {
                return res.status(404).json({ message: 'Không tìm thấy bình luận cần cập nhật.' });
            }
    
            res.status(200).json({ message: 'Sửa bình luận thành công'});
        } catch (error) {
            res.status(500).json({mesage:error.message});
        }
    },
};

module.exports = commentController;
