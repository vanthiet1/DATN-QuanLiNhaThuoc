import React, { useEffect, useState, useContext } from 'react';
import { StreamChat } from 'stream-chat';
import ChatProvider from '../../components/chat/ChatProvider';
import { ChannelList, Channel, Window, MessageList, MessageInput } from 'stream-chat-react';
import chatServices from '../../services/chatService';
import { UserContext } from '../../contexts/UserContext';
import userServices from '../../services/userService';
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = 'hgf62k35upwm';
const chatClient = StreamChat.getInstance(apiKey);

const Chat = () => {
    const { user } = useContext(UserContext) || { user: null };
    const [tokenChat, setTokenChat] = useState(null);
    const [channel, setChannel] = useState(null);
    const [staff, setStaff] = useState([]);
    console.log(user);

    // Lấy danh sách nhân viên
    useEffect(() => {
        const getAllStaff = async () => {
            try {
                const staffList = await userServices.getAllStaff();
                setStaff(staffList);
            } catch (error) {
                console.error("Error fetching staff:", error);
            } 
        };
        getAllStaff();
    }, []);
    useEffect(() => {
        if (!user) {
            return;
        }
        const getToken = async () => {
            try {
                const token = await chatServices.getTokenChat({ userId: user._id, name: user.fullname, role: user.role_id.role_Name });
                if (token) {
                    setTokenChat(token.token);
                } else {
                    console.error("No token returned");
                }
            } catch (error) {
                console.error("Error getting token:", error);
            } finally {
                setLoading(false);
            }
        };
        getToken();
    }, [user]);
    useEffect(() => {
        const connectChat = async () => {
            if (tokenChat && user && staff.length > 0) {
                try {
                    await chatClient.connectUser(
                        { id: user?._id, name: user?.fullname, role: user?.role_id?.role_Name },
                        tokenChat
                    );
                    const channelId = `user-${user._id}-chat`;
                    const existingChannels = await chatClient.queryChannels({
                        id: channelId,
                    });
                    if (existingChannels.length > 0) {
                        setChannel(existingChannels[0]);
                    } else {
                        const memberIds = [user._id, ...staff.map(emp => emp._id)];
                        const newChannel = chatClient.channel('messaging', 'general', {
                            name: `Chat với nhân viên ${staff[0]?.fullname || ''}`,
                            members: memberIds,
                        });
                        await newChannel.create();
                        setChannel(newChannel);
                    }
                } catch (error) {
                    console.error("Error connecting user or creating channel:", error);
                }
            }
        };

        connectChat();

        return () => {
            if (chatClient && chatClient.wsConnectionStatus === 'connected') {
                chatClient.disconnectUser()
                    .then(() => console.log("User disconnected successfully"))
                    .catch((error) => console.error("Error disconnecting user:", error));
            }
        };
    }, [tokenChat, user, staff]);

    if (staff.length === 0) {
        return <div>Không có nhân viên nào để chat!</div>;
    }

    return (
        <ChatProvider userId={user?._id} token={tokenChat}>
            <div style={{ display: 'flex', height: '100vh' }}>
                <ChannelList filters={{
                    type: 'messaging',
                    members: { $in: [user._id] }
                }} />
                <Channel channel={channel}>
                    <Window>
                        <MessageList />
                        <MessageInput />
                    </Window>
                </Channel>
            </div>
        </ChatProvider>
    );
};

export default Chat;
