const { Server } = require('socket.io');
const Message = require('../models/messageModel/message');
const User = require('../models/userModel/user')
let io;

const users = {}; 

const initIo = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('Người dùng kết nối:', socket.id);
        socket.on('join', async (userId) => {
            users[socket.id] = userId; 
            try {
              const user = await User.findById(userId); 
              if (user) {
                io.emit('userConnected', { userId: userId, username: user.name });
              }
            } catch (error) {
              console.error('Error fetching user:', error);
            }
            socket.join(userId);
          });

        socket.on('sendMessage', async (data) => {
            const { fromUserId, toUserId , productId , message,timestamp } = data;
            if (!fromUserId || !toUserId || !message ||!timestamp) {
                console.error('Invalid data received:', data);
                return;
            }
            try {
                const newMessage = new Message({ fromUserId, toUserId, productId , message , timestamp });
                await newMessage.save();
                io.to(toUserId).emit('receiveMessage', { fromUserId, message , timestamp });
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('heartbeat', () => {
            console.log('Received heartbeat from client');
        });

        socket.on('disconnect', async () => {
            const userId = users[socket.id];
            if(userId){
                try {
                    const user = await User.findById(userId); 
                    if (user) {
                        console.log('Người dùng đã ngắt kết nối:', user.name);
                        io.emit('userDisconnected', { userId: userId, username: user.name });
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
            delete users[socket.id]; 
        });
    });
};

const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized. Call initIo first.");
    }
    return io;
};

module.exports = {
    initIo,
    getIo
};
