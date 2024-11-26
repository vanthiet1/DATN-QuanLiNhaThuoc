import { useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext';

const useHandleNewOrder = (onRegisterRoom) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on('notificationNewOrder', onRegisterRoom);

    return () => {
      socket.off('notificationNewOrder', onRegisterRoom);
    };
  }, []);
  return '';
};

export default useHandleNewOrder;
