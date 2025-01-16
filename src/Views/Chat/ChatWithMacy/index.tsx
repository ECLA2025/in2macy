import { Icon } from "@iconify/react/dist/iconify.js";
import { FormEvent, useEffect, useState } from "react";
import MacyAI from "../../../assets/macyAI.png";
import Macy from "../../../assets/IN2MACY.png";
import User from "../../../assets/image.png";
import { useChatWithMacy } from "../../../hooks/useChatMacy";
import { useGetChatsWithMacy } from "../../../hooks/useGetMacyChat";
import { ChatResponse } from "../../../types/auth.types";

export const ChatWithMacy = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [messageInput, setMessageInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { sendMessage, isLoading } = useChatWithMacy();
  const { getMessage } = useGetChatsWithMacy();
  const [messages, setMessages] = useState<ChatResponse[] | null>([]); // Store fetched messages

  interface Chat {
    id: number;
    title: string;
    time: string;
  }

  // Use useEffect to fetch the messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      console.log("Fetching");
      const messages = await getMessage();
      console.log(messages);
      setMessages(messages);
      if (messages) {
        console.log("Fetched messages:", messages);
      }
    };

    fetchMessages();
  }, [getMessage, messageInput]); // Only re-run if getMessage changes

  // Sample data for chats and messages remain the same
  const chats: Chat[] = [
    {
      id: 1,
      title: "New Conversation",
      time: "10:30 AM",
    },
  ];

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const response = await sendMessage(messageInput);
    if (response) {
      // Handle successful response
      console.log(response.message);
    }
    if (!messageInput.trim()) return;
    setMessageInput("");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Mobile Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 text-white"
      >
        <Icon
          icon={isSidebarOpen ? "mdi:close" : "mdi:menu"}
          className="w-6 h-6"
        />
      </button>

      {/* Chats Panel */}
      <div
        className={`
        fixed lg:relative w-full lg:w-1/3 border-r border-gray-300 bg-white 
        flex flex-col justify-between h-full
        transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        z-40
      `}
      >
        <div>
          {/* Search Bar */}
          <div className="p-3 border-b space-y-4">
            <div className="relative">
              <Icon
                icon="iconamoon:search-light"
                className="absolute right-3 top-1/3 transform -translate-y-1/2 text-theme-dark-blue w-5 h-5"
              />
              <img src={MacyAI} alt="" />
            </div>
            <div className="text-xs text-theme-dark-blue font-bold text-start pl-2">
              Conversation History
            </div>
          </div>

          {/* Chats List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat);
                  setIsSidebarOpen(false); // Close sidebar on mobile after selection
                }}
                className={`flex items-center p-3 py-6 border-b cursor-pointer hover:bg-theme-faint-dark-blue ${
                  selectedChat?.id === chat.id
                    ? "bg-theme-dark-blue text-white"
                    : ""
                }`}
              >
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{chat.title}</h3>
                  </div>
                  <div className="flex justify-between">
                    {selectedChat?.id === chat.id && (
                      <span className="bg-green-500 text-white rounded-full px-2 text-xs"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            className="p-2 text-white bg-theme-blue rounded-full hover:bg-blue-600 focus:outline-none flex items-center px-5 py-2 gap-3 mx-auto mb-5"
            onClick={() => {
              setSelectedChat(chats[0]);
            }}
          >
            <Icon icon="material-symbols:add" className="w-5 h-5" />
            Start A New Conversation
          </button>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col bg-[#171840]">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-[#1F2051] text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center"></div>
                <div>
                  <h3 className="font-semibold">{selectedChat.title}</h3>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {
                // macyIsLoading ? (
                //   <div className="min-h-screen flex items-center justify-center">
                //     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                //   </div>
                // ) :
                messages?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.is_user ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.is_user ? (
                      <div className="flex gap-2">
                        <div
                          className={`max-w-[70%] rounded-xl p-3 text-white text-start ${
                            message.is_user
                              ? "bg-theme-blue rounded-br-none"
                              : "bg-[rgb(10,16,47)] rounded-bl-none"
                          }`}
                        >
                          <p>{message.message}</p>
                          <span
                            className={`text-xs ${
                              message.is_user
                                ? "text-blue-100"
                                : "text-gray-500"
                            } float-left mt-1`}
                          >
                            {message.timestamp?.toLocaleTimeString()}
                          </span>
                        </div>
                        <img
                          src={User}
                          alt="Display Pic"
                          className="w-9 h-9 rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="flex">
                        <img
                          src={Macy}
                          alt="Display Pic"
                          className="w-9 h-9 rounded-full"
                        />
                        <div
                          className={`max-w-[70%] rounded-xl p-3 text-white text-start ${
                            message.is_user
                              ? "bg-theme-blue rounded-br-none"
                              : "bg-[rgb(10,16,47)] rounded-bl-none"
                          }`}
                        >
                          <p>{message.message}</p>
                          <span
                            className={`text-xs ${
                              message.is_user
                                ? "text-blue-100"
                                : "text-gray-500"
                            } float-left mt-1`}
                          >
                            {message.timestamp?.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              }
              {isLoading ? (
                <div className="flex">
                  <img
                    src={Macy}
                    alt="Display Pic"
                    className="w-9 h-9 rounded-full"
                  />
                  <div
                    className={`max-w-[70%] rounded-xl p-3 text-white text-start"bg-theme-blue rounded-br-none bg-[rgb(10,16,47)] rounded-bl-none
                        `}
                  >
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-white border-t rounded-xl w-11/12 mx-auto mb-4"
            >
              <div className="flex items-center space-x-2">
                <button className="p-2 text-grey-400 rounded-full hover:bg-blue-600 focus:outline-none">
                  <Icon icon="mdi:paperclip" className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Chat with Macy in this safe space"
                  className="flex-1 px-4 py-2 rounded-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 text-grey-400 rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  <Icon icon="mingcute:send-line" className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <h3 className="text-xl font-semibold mb-2">
                Select a chat to start messaging
              </h3>
              <p>Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
