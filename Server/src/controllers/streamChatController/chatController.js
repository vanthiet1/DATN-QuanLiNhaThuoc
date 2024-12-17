const { StreamChat } = require('stream-chat');
const apiKey =  process.env.KEY_CHAT;
const apiSecret =  process.env.SECRET_KEY_CHAT;

const serverClient = StreamChat.getInstance(apiKey, apiSecret);
const ChatController = {
    chat: async (req, res) => {
        const { userId, name , role } = req.body;
        try {
            await serverClient.upsertUser({ id: userId, name:name , role: role });
            const token = serverClient.createToken(userId);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    },
  };
  module.exports = ChatController;