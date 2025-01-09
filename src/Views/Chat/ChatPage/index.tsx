import { Icon } from "@iconify/react/dist/iconify.js";
import { FormEvent, useEffect, useState } from "react";
import { useFindFriend } from "../../../hooks/useFindFriend";
import { Message, Thread, User } from "../../../types/auth.types";
import Macy from "../../../assets/IN2MACY.png";
import user from "../../../assets/image.png";
import { useStartChatFriend } from "../../../hooks/useChatFriends";
import { useFetchThreads } from "../../../hooks/useFetchThreads";
import { useSendMessage } from "../../../hooks/useSendMessage";
import { useFetchChat } from "../../../hooks/useFetchChat";
import Upload from "./UploadPopOver";

const ChatInterface = () => {
  const [selectedContact, setSelectedContact] = useState<User>();
  const [messageInput, setMessageInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[] | null>([]);
  const [threads, setThreads] = useState<Thread[] | null>([]);
  const [threadId, setThreadId] = useState<Thread | null>(null);
  const { findFriend, isLooking } = useFindFriend();
  const { startChat } = useStartChatFriend();
  const { sendMessage } = useSendMessage();
  const { fetchThreads, threadsAreLoading } = useFetchThreads();
  const { fetchChat } = useFetchChat();
  const userID = JSON.parse(localStorage.getItem("userData")!);

  useEffect(() => {
    const fetchAllThreads = async () => {
      const threads = await fetchThreads();
      console.log(threads);
      setThreads(threads);
      if (threads) {
        console.log("Fetched threads:", threads);
      }
    };
    fetchAllThreads();
  }, [threadId]);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log("Fetching");
      if (threadId) {
        const messages = await fetchChat(threadId!.id);
        console.log(messages);
        setMessages(messages);
        if (messages) {
          console.log("Fetched messages:", messages);
        }
      }
    };

    fetchMessages();
  }, [messageInput, threadId]);

  const friend = (contact: Thread) => {
    console.log(userID.user_id, "Over her!!");
    if (contact.user1!.id === userID.user_id) {
      console.log("user2", contact.user1);
      return contact.user2;
    } else {
      console.log("user1");
      return contact.user1;
    }
  };
  // console.log(threads, "here");

  // Sample data remains the same
  // const contacts: User[] = [
  //   {
  //     id: 1,
  //     username: "John Doe",
  //     lastMessage: "See you tomorrow!",
  //     time: "10:30 AM",
  //     unread: 2,
  //     online: true,
  //   },
  //   {
  //     id: 2,
  //     username: "Alice Smith",
  //     lastMessage: "Thanks for your help",
  //     time: "9:15 AM",
  //     unread: 0,
  //     online: false,
  //   },
  //   {
  //     id: 3,
  //     username: "Bob Johnson",
  //     lastMessage: "How about lunch?",
  //     time: "Yesterday",
  //     unread: 1,
  //     online: true,
  //   },
  // ];

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    console.log(threadId, "over here!!!!");
    const response = await sendMessage(threadId!.id, messageInput);
    if (response) {
      // Handle successful response
      console.log(response.message);
    }
    if (!messageInput.trim()) return;
    setMessageInput("");
  };

  const handleSearch = async () => {
    setIsSearching(true);
    const response = await findFriend(searchInput);
    if (response) {
      // Handle successful response
      console.log(response);
      setResult(response);
      console.log(result);
    }
    if (!searchInput.trim()) return;
  };

  const handleStartChat = async (chatId: string) => {
    const response = await startChat(chatId);
    if (response) {
      // Handle successful response
      await setThreadId(response);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Mobile Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 text-gray-600"
      >
        <Icon
          icon={isSidebarOpen ? "mdi:close" : "mdi:menu"}
          className="w-6 h-6"
        />
      </button>

      {/* Contacts Panel */}
      <div
        className={`
        fixed lg:relative w-full lg:w-1/3 border-r border-gray-300 bg-white 
        flex flex-col h-full
        transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        z-40
      `}
      >
        {/* Search Bar */}
        <form>
          <div className="p-3 border-b space-y-4">
            <div className="relative">
              {isSearching ? (
                <button
                  onClick={() => {
                    setIsSearching(false);
                    setSearchInput("");
                  }}
                >
                  <Icon
                    icon="material-symbols:close"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-theme-blue w-5 h-5"
                  />
                </button>
              ) : (
                <button onClick={() => handleSearch()}>
                  <Icon
                    icon="iconamoon:search-light"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-theme-blue w-5 h-5"
                  />
                </button>
              )}

              <input
                type="text"
                placeholder="Search for a chat"
                className="w-full pl-3 pr-4 py-2 border border-theme-blue placeholder:text-theme-blue rounded-lg focus:outline-none"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  handleSearch();
                }}
              />
            </div>

            <div className="text-xs text-gray-400 text-start">Chat History</div>
            <div className="flex items-center gap-3 justify-center flex-wrap">
              <div className="rounded-full px-4 py-1 text-theme-blue bg-theme-dark-blue">
                All
              </div>
              <div className="rounded-full px-4 py-1 text-white bg-theme-faint-dark-blue">
                Unread
              </div>
              <div className="rounded-full px-4 py-1 text-white bg-theme-faint-dark-blue">
                Groups
              </div>
              <div className="rounded-full px-4 py-1 text-white bg-theme-faint-dark-blue">
                Favourite
              </div>
            </div>
          </div>
        </form>

        {/* Contacts List */}
        {isSearching ? (
          <div className="overflow-y-auto">
            {isLooking ? (
              <div className="items-center justify-center">
                <div className="test-2xl p-11">Loading...</div>
              </div>
            ) : result.length > 0 ? (
              <div>
                {result.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={async () => {
                      setMessages(null);
                      handleStartChat(contact.id.toString());
                      setSelectedContact(contact);
                      setIsSearching(false);
                      setSearchInput("");
                    }}
                    className={`flex items-center p-3 border-b cursor-pointer hover:bg-theme-faint-dark-blue ${
                      selectedContact?.id === contact.id
                        ? "bg-theme-faint-dark-blue"
                        : ""
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-300 border border-theme-dark-blue rounded-full flex items-center justify-center"></div>
                      {/* {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )} */}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{contact.username}</h3>
                        {/* <span className="text-sm text-gray-500">{contact.time}</span> */}
                      </div>
                      {/* <div className="flex justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {contact.lastMessage}
                      </p>
                      {contact.unread > 0 && (
                        <span className="bg-green-500 text-white rounded-full px-2 text-xs">
                          {contact.unread}
                        </span>
                      )}
                    </div> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center mt-5">No results found</div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center p-3 border-b cursor-pointer hover:bg-theme-faint-dark-blue">
              <div className="relative">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Icon
                    icon="material-symbols-light:archive-outline-sharp"
                    className="text-theme-dark-blue w-10 h-10"
                  />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Archived</h3>
                  <span className="text-sm text-gray-500">10</span>
                </div>
              </div>
            </div>

            {threadsAreLoading ? (
              <div className="items-center justify-center">
                <div className="test-2xl p-11">Loading...</div>
              </div>
            ) : (
              threads!.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    setMessages(null);
                    setSelectedContact(friend(contact));
                    setThreadId(contact);
                    setIsSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`flex items-center p-3 border-b cursor-pointer hover:bg-theme-faint-dark-blue ${
                    selectedContact?.id === contact.user2!.id
                      ? "bg-theme-faint-dark-blue"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 border border-theme-dark-blue rounded-full flex items-center justify-center"></div>
                    {/* {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )} */}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">
                        {friend(contact)!.username}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {contact.last_message_timestamp?.toLocaleTimeString()}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {contact.lastMessage}
                    </p>
                    {contact.unread! > 0 && (
                      <span className="bg-green-500 text-white rounded-full px-2 text-xs">
                        {contact.unread}
                      </span>
                    )}
                  </div> */}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col bg-theme-dark-blue">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-[#1F2051] flex justify-between items-center text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 border border-theme-dark-blue rounded-full flex items-center justify-center"></div>
                <div>
                  <h3 className="font-semibold">{selectedContact.username}</h3>
                  {selectedContact.online && (
                    <span className="text-sm text-green-500">Online</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4"></div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4  bg-[#171840]">
              {
                // isLoading ? (
                //   <div className="min-h-screen flex items-center justify-center">
                //     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                //   </div>
                // ) : (
                messages?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === userID.user_id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === userID.user_id ? (
                      <div className="flex gap-2">
                        <div
                          className={`max-w-[70%] rounded-xl p-3 text-white text-start ${
                            message.sender === userID.user_id
                              ? "bg-theme-blue rounded-br-none"
                              : "bg-[rgb(10,16,47)] rounded-bl-none"
                          }`}
                        >
                          <p>{message.message}</p>
                          <span
                            className={`text-xs ${
                              message.sender === userID.user_id
                                ? "text-blue-100"
                                : "text-gray-500"
                            } float-left mt-1`}
                          >
                            {message.timestamp?.toLocaleTimeString()}
                          </span>
                        </div>
                        <img
                          src={user}
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
                            message.sender === userID
                              ? "bg-theme-blue rounded-br-none"
                              : "bg-[rgb(10,16,47)] rounded-bl-none"
                          }`}
                        >
                          <p>{message.message}</p>
                          <span
                            className={`text-xs ${
                              message.sender === userID
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
                // )
              }
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-[#1F2051] rounded-3xl"
            >
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

export default ChatInterface;
