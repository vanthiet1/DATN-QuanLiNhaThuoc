import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import tokenService from '../../services/tokenService';
const apiKey = 'your-api-key';
const client = StreamChat.getInstance(apiKey);

const ChatComponent = () => {
  
  const userId = 'hgf62k35upwm'; // ID của người dùng
  const token = tokenService.getAccessToken();

 

  // Kết nối người dùng với Stream Chat bằng token người dùng và Stream Chat token
  client.connectUser(
    { id: userId, name: 'Client Name' },
    token
  );

  const channel = client.channel('messaging', 'chat-channel', {
    name: 'Customer Support',
  });

  return (
    <Chat client={client} theme="messaging light">
      <Channel channel={channel}>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Channel>
    </Chat>
  );
};

export default ChatComponent;
