import React, { createContext, useEffect, useState } from "react";
import { get_request } from "../utilities/utilities.js";
import BASE_URL_API from "../utilities/baseURL.js";

const ChatContext = createContext();

const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true); // Set loading to true when fetching
        setUserChatsError(null);
        try {
          const response = await get_request(
            `${BASE_URL_API}/finduserchat/${user._id}`
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

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
