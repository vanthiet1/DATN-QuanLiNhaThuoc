const { Server } = require('socket.io');

let io;
const socket = async (httpServer) => {
  try {
    io = new Server(httpServer, {
      cors: {
        origin: 'https://nha-thuoc-binh-an-duoc.vercel.app',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('Người dùng kết nối:', socket.id);

      socket.on('registerRoom', (userRole) => {
        console.log(userRole);
        if (userRole === 'admin') {
          socket.join('admin');
          console.log('Người dùng là admin');
        } else if (userRole === 'staff') {
          socket.join('staff');
          console.log('Người dùng là staff');
        } else {
          socket.join('customer');
          console.log('Người dùng là customer');
        }
      });

      socket.on('disconnect', async () => {
        console.log('Người dùng ngắn kết nối:', socket.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getIoSocket = () => {
  if (!io) {
    throw Error('Có lỗi khi get io');
  }
  return io;
};

module.exports = {
  socket,
  getIoSocket
};
