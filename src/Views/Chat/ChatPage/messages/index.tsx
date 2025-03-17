import { Icon } from "@iconify/react/dist/iconify.js";
import { FormEvent, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import Upload from "../UploadPopOver";
import {
  ExpectedMessageThread,
  Message,
  Thread,
} from "../../../../types/auth.types";
import user from "../../../../assets/image.png";

interface ThreadProp {
  thread: Thread;
}

export const Messages = (thread: ThreadProp) => {
  console.log(thread, "na me");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[] | []>([]);
  const userID = JSON.parse(localStorage.getItem("userData")!);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const WS_URL = `wss://ff3e-102-89-82-102.ngrok-free.app/ws/chat/${thread.thread.id}/`;
  const accessToken = localStorage.getItem("accessToken");
  const token = `Token ${accessToken}`;
  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<ExpectedMessageThread>(WS_URL, {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      onError: (event) => {
        console.error("WebSocket error:", event);
      },
      onClose: () => {
        console.log("WebSocket connection closed.");
      },
      queryParams: {
        Authorization: token,
      },
      shouldReconnect: () => true,
      reconnectInterval: 3000,
    });

  useEffect(() => {
    if (lastJsonMessage) {
      console.log(lastJsonMessage);
      if (lastJsonMessage.type === "chat_message") {
        const message: Message = {
          is_read: lastJsonMessage.is_read!,
          message: lastJsonMessage.message!,
          receiver_id: lastJsonMessage.receiver_id!,
          sender_id: lastJsonMessage.sender_id!,
          timestamp: lastJsonMessage.timestamp!,
          file_url: lastJsonMessage.file_url,
        };
        const updatedMessages: Message[] = [...messages, message];
        setMessages(updatedMessages);
      } else {
        setMessages(lastJsonMessage.messages!);
      }
    }
  }, [lastJsonMessage, messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendJsonMessage({ message: messageInput });
    setMessageInput("");
  };

  return (
    <div className="h-full">
      <div className="flex flex-col h-full bg-[#171840]">
        {/* Chat Header */}
        <div className="p-4 bg-[#1F2051] flex justify-between items-center text-white relative">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gray-300 border border-theme-dark-blue rounded-full flex items-center justify-center">
              <img
                src={`${import.meta.env.VITE_API_URL}/${
                  thread.thread.other_user_profile_picture
                }`}
                alt="dp"
                className="w-11 h-11 rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold">
                {thread.thread.other_user_username}
              </h3>
              {/* {selectedContact.online && (
                    <span className="text-sm text-green-500">Online</span>
                  )} */}
            </div>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((message, i) => (
            <div
              key={i}
              className={`flex gap-2 ${
                message.sender_id === userID.user_id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {/* Sender_id's Message (Right-aligned)  */}
              {message.sender_id === userID.user_id ? (
                <div className="flex gap-2 items-end">
                  <div
                    className={`max-w-[70%] rounded-xl p-3 text-white ${
                      message.sender_id === userID.user_id
                        ? "bg-theme-blue rounded-br-none"
                        : "bg-[rgb(10,16,47)] rounded-bl-none"
                    }`}
                  >
                    <p>{message.message}</p>
                    <span
                      className={`text-xs ${
                        message.sender_id === userID.user_id
                          ? "text-blue-100"
                          : "text-gray-500"
                      } float-left mt-1`}
                    >
                      {/* {message.timestamp?.toLocaleTimeString()} */}
                    </span>
                  </div>
                  <img
                    src={user}
                    alt="Display Pic"
                    className="w-9 h-9 rounded-full"
                  />
                </div>
              ) : (
                /* Receiver's Message (Left-aligned) */
                <div className="flex gap-2 items-end">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${
                      thread.thread.other_user_profile_picture
                    }`}
                    alt="Display Pic"
                    className="w-9 h-9 rounded-full"
                  />
                  <div
                    className={`max-w-[70%] rounded-xl p-3 text-white ${
                      message.sender_id === userID.user_id
                        ? "bg-theme-blue rounded-br-none"
                        : "bg-[rgb(10,16,47)] rounded-bl-none"
                    }`}
                  >
                    <p>{message.message}</p>
                    <span
                      className={`text-xs ${
                        message.sender_id === userID.user_id
                          ? "text-blue-100"
                          : "text-gray-500"
                      } float-left mt-1`}
                    >
                      {/* {message.timestamp?.toLocaleTimeString()} */}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Scroll anchor for new messages */}
          <div ref={messagesEndRef} />
        </div>
        {/* Message Input Form (Sticky Bottom) */}
        <div className="mt-auto p-4 bg-[#1F2051] rounded-t-3xl">
          <form onSubmit={handleSendMessage}>
            <div className="flex items-center space-x-2">
              <Upload />
              <div className="flex justify-between w-full bg-gray-100 rounded-full">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 text-gray-400 rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  <Icon icon="mingcute:send-line" className="w-5 h-5" />
                </button>
              </div>
              <Icon
                icon="solar:microphone-large-linear"
                className="w-5 h-5 text-theme-blue"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
