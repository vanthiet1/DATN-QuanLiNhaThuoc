import socket from "../configs/socketConfig";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import staffServices from "../services/staffService";
import ChatClient from "./chatClient";
import messageService from "../services/messageService";
import Index from '../modules/auth/index'
const Message = () => {
    const product = {
        _id: "66cc32b6c19d0ff1c809fc85",
        name: "mặt nạ mát xa  Mon Aug 26 2024 14:45:44 GMT+0700 (Indochina Time)",
        sub_category_id: "66c5ceb897c2e7b952aa6899",
        brand_id: "66c5ceb897c2e7b952aa6899",
        description: "San pham tot",
        description_short: "San pham tot",
        price_old: 100000,
        price_distcount: 90000,
        percent_price: 0,
        stock: 100,
        slug: "mat-na-mat-xa-mon-aug-26-2024-144544-gmt0700-indochina-time",
        images: [
            {
                product_id: "66cc32b6c19d0ff1c809fc85",
                url_img: "https://res.cloudinary.com/dddz1buyw/image/upload/v1724658353/nhathuoc/products/img0698-1.jpg",
            },
            {
                product_id: "66cc32b6c19d0ff1c809fc85",
                url_img: "https://res.cloudinary.com/dddz1buyw/image/upload/v1724658357/nhathuoc/products/img0709-2.jpg",
            }
        ]
    };
    

    const { user } = useContext(UserContext);
    const [inputMessage, setInputMessage] = useState("Tôi cần biết thêm");
    const [staff, setStaff] = useState([]);
    const [staffSelectedChat, setStaffSelectedChat] = useState(null);
    const [isShowStaff, setIsShowStaff] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentStaffId, setCurrentStaffId] = useState(null);
  const idStaff = localStorage.getItem('idStaff')
  

 
    useEffect(() => {
        const getMessageChat = async () => {
            if (user && idStaff) {
                const dataMessage = await messageService.getMessage({
                    fromUserId: user?._id,
                    toUserId: idStaff,
                })
                if (dataMessage) setMessages(dataMessage);
            }
        }
        getMessageChat()
    }, [user,idStaff])
 
    useEffect(() => {
        const getAllStaff = async () => {
            const data = await staffServices.getAllStaff();
            setStaff(data);
        };
        getAllStaff();
    }, []);

    useEffect(() => {
        const getAnStaff = async () => {
            if (idStaff) {
                const dataDetailStaff = await staffServices.getAnStaff(idStaff);
                if (dataDetailStaff) setStaffSelectedChat(dataDetailStaff);
            }
        };
        getAnStaff();
    }, [idStaff]);
  
    useEffect(() => {
        const handleReceiveMessage = (messageData) => {
            setMessages((prevMessages) => [...prevMessages, messageData]);
        };
        const handleReconnect = () => {
            console.log("Đã quay lại", user._id);
            socket.emit('join', user._id);
        };

        const handleReconnectAttempt = () => {
            console.log("Attempting to reconnect...");
        };

        const sendHeartbeat = () => {
            console.log("Sending heartbeat");
            socket.emit('heartbeat');
        };

        let heartbeatInterval;

        if (user) {
            socket.connect();
            socket.emit('join', user._id);
            socket.on('receiveMessage', handleReceiveMessage);
            socket.on('reconnect', handleReconnect);
            socket.on('reconnect_attempt', handleReconnectAttempt);
            heartbeatInterval = setInterval(sendHeartbeat, 30000);

            return () => {
                socket.off('receiveMessage', handleReceiveMessage);
                socket.off('reconnect', handleReconnect);
                socket.off('reconnect_attempt', handleReconnectAttempt);
                socket.emit('leave', user._id);
                clearInterval(heartbeatInterval);
            };
        }
    }, [user, staff]);


    const handleSendMessage = (staff) => {
        if(!staff) return
        if (currentStaffId === staff._id) {
        console.log("Bạn đã chọn nhân viên này rồi.");
        return;
    }
    setCurrentStaffId(staff._id);
        localStorage.setItem('idStaff',staff._id)
        const messageData = {
            fromUserId: user?._id,
            toUserId: staff._id,
            message: inputMessage,
            timestamp: new Date().toISOString()
        };
        if (product?._id) {
            messageData.productId = product;
        }
        socket.emit('sendMessage', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setInputMessage("");
    };

    return (
        <div>
            <h1>Đây là chi tiết sản phẩm</h1>
            <div className="shadow p-2">
                <span>{product.name}</span>
                <img className="w-[200px]" src={product?.images[0].url_img} alt="" />
                <button className="bg-blue-500 text-[#fff] w-full">Mua</button>
            </div>

            <button onClick={() => setIsShowStaff(true)}>Tư vấn sản phẩm này cho tôi</button>

            {isShowStaff && (
                <>
                    <h1>Đây là list nhân viên tư vấn</h1>
                    {staff && staff.map((staff) => (
                        <div key={staff._id}>
                            <span className="block">{staff.fullname}</span>
                          
                            <button
                                onClick={() => {
                                    handleSendMessage(staff)
                                }}
                                className="bg-green-600 text-[#fff]"
                            >
                                Tư vấn cho tôi
                            </button>
                        </div>
                    ))}
                </>
            )}
            <div className="fixed z-10 top-[20%] right-0">
                <ChatClient staff={staffSelectedChat} messages={messages} userLogin={user} />
            </div>
            
        </div>
    );
};

export default Message;
