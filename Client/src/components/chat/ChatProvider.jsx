import { useEffect } from 'react';
import { Chat } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

const apiKey = 'hgf62k35upwm';
const chatClient = StreamChat.getInstance(apiKey);

 const ChatProvider = ({ children, userId, token }) => {
    useEffect(() => {
        if (userId && token) {
            chatClient.connectUser({ id: userId }, token);
        }

        return () => chatClient.disconnectUser();
    }, [userId, token]);

    return <Chat client={chatClient} theme="str-chat__theme-light">{children}</Chat>;
};
export default ChatProvider
