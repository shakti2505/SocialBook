import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { get_request } from "../utilities/utilities.js";
import { io } from "socket.io-client";
import UserDataContext from "./UserContext.js";
import { AuthContext } from "./AuthContext.js";
import axios from "axios";
import BASE_URL_API from "../utilities/baseURL";
import { apiVariables } from "../utilities/apiVariables";
const ChatContext = createContext();

const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState(null);
  const [message, setmessage] = useState("");
  const [newchat, setNewChat] = useState(null);
  const [existingMessages, setExistingMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [chatWindowData, setChatWindowData] = useState([]);
  const [loggedInUserfriend, setLoggedInUserfriends] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [notificaiton, setNotification] = useState([]);
  const [allMessages, setallMessages] = useState([]);
  const [lastMessages, setLastMessges] = useState([]);
  const [SerchedUsers, setSerchedUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchUserforPotentialChats, setSearchUserforPotentialChats] =
    useState("");
  const [potentialChat, setPotentialChat] = useState([]);

  const updateSearchUser = useCallback((info) => {
    setSearchUser(info);
  }, []);

  const updateSearchUserforPotentialChats = useCallback((info) => {
    setSearchUserforPotentialChats(info);
  }, []);
  const updatePotentialChats = useCallback((info) => {
    setPotentialChat(info);
  }, []);

  const updateLoggedInUserFriend = useCallback((info) => {
    setLoggedInUserfriends(info);
  }, []);

  const updateMessage = useCallback((info) => {
    setmessage(info);
  }, []);

  const updateSearchedUser = useCallback((info) => {
    setSerchedUsers(info);
  }, []);
  const updateSocket = useCallback((info) => {
    setSocket(info);
  }, []);

  //https://socialbook-x3jq.onrender.com

  // initial socket
  useEffect(() => {
    const newSocket = io("https://socialbook-x3jq.onrender.com");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  //add online users

  useEffect(() => {
    if (socket == null || user == null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUser", (response) => {
      setOnlineUser(response);
    });
    return () => {
      socket.off("getOnlineUser");
    };
  }, [socket]);

  //  sendMessage
  useEffect(() => {
    if (socket === null) return;
    const recipientID =
      userChats && userChats[0].members.filter((item) => item !== user._id)[0];
    socket.emit("sendMessage", { ...newMessage, recipientID });
  }, [newMessage]);

  //receive message and notification
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {

      if (userChats.some((item) => item._id == res.chatId)) {
        setExistingMessages((prev) => [...prev, res]);
      }
    });

    socket.on("getNotification", (res) => {
      const isChatOpen =
        res.senderId === chatWindowData.friend_ID ? true : false;
      if (isChatOpen) {
        setNotification((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotification((prev) => [res, ...prev]);
      }
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, userChats]);

  const CreateNewChat = useCallback(async (firstId, secondId) => {
    const apicall = await axios.post(
      BASE_URL_API + apiVariables.createChat.url,
      {
        firstId: firstId,
        secondId: secondId,
      },
      { withCredentials: "include" }
    );
    if (apicall.status !== 201 || 500) {
      setNewChat(apicall.data);
    } else {
      setNewChat(apicall.data);
    }
  });

  const getMessages = useCallback(async (friend_ID) => {
    const res = userChats.find((item) => item.members.includes(friend_ID));
    const apicall = await axios.get(
      BASE_URL_API + apiVariables.getMessages(res._id).url,
      { withCredentials: true }
    );
    if (apicall.status !== 200) {
      console.log("Internal sever error");
    } else {
      setExistingMessages(apicall.data);
    }
  });

  const getAllMessages = useCallback(async () => {
    const apicall = await axios.get(
      BASE_URL_API + apiVariables.getAllMessages.url,
      { withCredentials: true }
    );
    if (apicall.status !== 200) {
      console.log("Internal sever error");
    } else {
      setallMessages(apicall.data);
    }
  });

  const getLastMessages = useCallback(async () => {
    const apicall = await axios.get(
      BASE_URL_API + apiVariables.getLastMessages.url,
      { withCredentials: true }
    );
    if (apicall.status !== 200) {
      console.log("Internal sever error");
    } else {
      setLastMessges(apicall.data);
    }
  });

  const sendMessage = useCallback(async (senderid, receiverId) => {
    const existingChat = userChats.find(chat => {
      return chat.members[0] === receiverId || senderid && chat.members[1] === senderid || receiverId;
    });
    const apicall = await axios.post(
      BASE_URL_API + apiVariables.sendMessages.url,
      {
        chatId: existingChat._id,
        senderId: senderid,
        receiverId: receiverId,
        senderDp: user.profilePic,
        text: message,
      },
      { withCredentials: "include" }
    );
    if (apicall.status !== 201 || 500) {
      setNewMessage(apicall.data);
      setmessage("");
      setExistingMessages((prev) => [...prev, apicall.data]);
    } else {
      setNewMessage(apicall.data);
    }
  });

  const searchPotentialConnetion = useCallback(async (apivar) => {
    if (searchUser.length !== 0) {
      const apicall = await axios.get(`${BASE_URL_API}${apivar.url}`, {
        withCredentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (apicall.status !== 200) {
        console.log("Internal Error");
      } else {
        setSerchedUsers(apicall.data.matchingUsers);
      }
    }
  });

  const searchPotentialChats = useCallback(async (apivar) => {
    if (searchUserforPotentialChats.length !== 0) {
      const apicall = await axios.get(`${BASE_URL_API}${apivar.url}`, {
        withCredentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (apicall.status !== 200) {
        console.log("Internal Error");
      } else {
        setPotentialChat(apicall.data);
      }
    }
  });

  const get_logged_in_user_friends = useCallback(async (apivar) => {
    setisLoading(true);
    const apicall = await axios.get(`${BASE_URL_API}${apivar}`, {
      withCredentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    if (apicall.status !== 200) {
      console.log("Internal Error");
    } else {
      setLoggedInUserfriends(apicall.data.FriendList);
      setisLoading(false);
    }
  });

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true); // Set loading to true when fetching
        setUserChatsError(null);
        try {
          const response = await get_request(
            `${BASE_URL_API}/services/chat/finduserchat/${user?._id}`
          );
          if (response.error) {
            setUserChatsError(response.error); // Set error state
          } else {
            setUserChats(response); // Set user chats state
          }
        } catch (error) {
          setUserChatsError("Error fetching user chats"); // Handle fetch error
        }
        setIsUserChatsLoading(false); // Set loading to false after fetch completes
      }
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    get_logged_in_user_friends(apiVariables.getLoggedInUserFriends.url);
  }, []);

  useEffect(() => {
    const getdata = setTimeout(() => {
      searchPotentialChats(
        apiVariables.searchPotentialChats(searchUserforPotentialChats)
      );
    }, 500);
    return () => clearTimeout(getdata);
  }, [searchUserforPotentialChats]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        onlineUsers,
        updateMessage,
        message,
        CreateNewChat,
        sendMessage,
        existingMessages,
        chatWindowData,
        setChatWindowData,
        loggedInUserfriend,
        getMessages,
        notificaiton,
        loggedInUserfriend,
        getAllMessages,
        allMessages,
        lastMessages,
        getLastMessages,
        searchPotentialConnetion,
        SerchedUsers,
        updateSearchUser,
        searchUser,
        updateSearchedUser,
        get_logged_in_user_friends,
        updateLoggedInUserFriend,
        updateSearchUserforPotentialChats,
        searchUserforPotentialChats,
        potentialChat,
        updatePotentialChats,
        socket,
        updateSocket
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext, ChatContextProvider };
