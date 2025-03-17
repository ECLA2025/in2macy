import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useFindFriend } from "../../../hooks/useFindFriend";
import { useStartChatFriend } from "../../../hooks/useChatFriends";
import { useFetchThreads } from "../../../hooks/useFetchThreads";
// import { useSendMessage } from "../../../hooks/useSendMessage";
import { useFetchChat } from "../../../hooks/useFetchChat";
import useWebSocket from "react-use-websocket";
import { Messages } from "./messages";
import { Thread, User, ExpectedThreads } from "../../../types/auth.types";

const ChatInterface = () => {
  const [selectedContact, setSelectedContact] = useState<User>();
  const [searchInput, setSearchInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<User[]>([]);
  const [threads, setThreads] = useState<Thread[] | null>([]);
  const [threadId, setThreadId] = useState<Thread | null>(null);
  const { findFriend, isLooking } = useFindFriend();
  const { startChat } = useStartChatFriend();
  // const { sendMessage } = useSendMessage();
  const { fetchThreads, threadsAreLoading } = useFetchThreads();
  const { fetchChat } = useFetchChat();

  const userID = JSON.parse(localStorage.getItem("userData")!);

  const friend = (contact: Thread) => {
    if (contact.user1!.id === userID.user_id) {
      return contact.user2;
    } else {
      return contact.user1;
    }
  };

  const WS_URL = `wss://ff3e-102-89-82-102.ngrok-free.app/ws/chat-threads/`;
  const accessToken = localStorage.getItem("accessToken");
  const token = `Token ${accessToken}`;
  const { sendJsonMessage, lastJsonMessage } = useWebSocket<ExpectedThreads>(
    WS_URL,
    {
      onOpen: (data) => {
        console.log("WebSocket connection established.");
        console.log(data, "holla");
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
    }
  );
  let socketThreads: Thread[] = [];
  if (lastJsonMessage) {
    if (
      lastJsonMessage.threads.length !== threads?.length ||
      lastJsonMessage.threads[0].id !== threads[0].id
    ) {
      setThreads(lastJsonMessage.threads);
    }
    console.log(lastJsonMessage.threads[0], "heree");
  }

  const handleSearch = async () => {
    setIsSearching(true);
    const response = await findFriend(searchInput);
    if (response) {
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
      console.log(threadId, " na thread");
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
        className="lg:hidden absolute top-7 -left-1 z-50 text-gray-600"
      >
        <Icon
          icon={isSidebarOpen ? "mdi:close" : "mdi:menu"}
          className="w-5 h-5"
        />
      </button>

      {/* Contacts Panel */}
      <div
        className={`
        fixed lg:relative w-full lg:w-1/3 border-r border-gray-300 bg-white 
        flex flex-col h-full
        transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen
            ? "-translate-x-0 pr-14"
            : "translate-x-full lg:translate-x-0"
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
                    setSelectedContact(friend(contact));
                    setThreadId(contact);
                    setIsSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`flex items-center p-3 border-b cursor-pointer hover:bg-theme-faint-dark-blue ${
                    selectedContact?.username === contact.other_user_username
                      ? "bg-theme-faint-dark-blue"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 border border-theme-dark-blue rounded-full flex items-center justify-center">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/${
                          contact.other_user_profile_picture
                        }`}
                        alt="dp"
                        className="w-11 h-11 rounded-full"
                      />
                    </div>
                    {/* {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )} */}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">
                        {contact.other_user_username}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {/* {contact.last_message_timestamp!.toLocaleTimeString()} */}
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
      <div className="flex-1 flex flex-col bg-theme-dark-blue h-screen">
        {selectedContact ? (
          <>
            {/* Messages */}
            <Messages thread={threadId!} />
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
