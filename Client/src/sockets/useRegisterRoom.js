import { useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext';

const useRegisterRoom = (onRegisterRoom) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    console.log(socket);
    let role = 'admin';
    socket.emit('registerRoom', onRegisterRoom || role);

    return () => {
      socket.off('registerRoom', onRegisterRoom);
    };
  }, []);
};

export default useRegisterRoom;
