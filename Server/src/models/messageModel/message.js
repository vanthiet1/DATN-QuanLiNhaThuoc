const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    fromUserId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    toUserId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Types.ObjectId, ref: 'Products' },
    message: { type: String, required: true },
    timestamp: { type: Date }
  });
  
  const Message = mongoose.model('Message', messageSchema);
  module.exports = Message;