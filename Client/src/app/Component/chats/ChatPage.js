import React, { useContext, useRef, useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ChatContext } from "../../../Context/ChatContext";
import { getTime } from "../../../utilities/utilities";
import { Link } from "react-router-dom";
import CallCard from "./CallingCard";
// import VideoChat from "./VideoChat";


const ChatPage = () => {
  const [videoCall, setVideoCall] = useState(false);

  
  const user = JSON.parse(localStorage.getItem("User"));
  const {
    onlineUsers,
    loggedInUserfriend,
    notificaiton,
    updateMessage,
    message,
    CreateNewChat,
    sendMessage,
    existingMessages,
    chatWindowData,
    setChatWindowData,
    updateChatWindowData,
    getMessages,
    lastMessages,
    searchPotentialConnetion,
    SerchedUsers,
    updateSearchUser,
    searchUser,
    updateSearchedUser,
    updateLoggedInUserFriend,
    updateSearchUserforPotentialChats,
    potentialChat,
    updatePotentialChats,
    searchUserforPotentialChats,
    streams,
    myVideo,
    userVideo,
    callAccepted,
    callEnded,
    callUser,
    getVideo,
    leaveCall,
    answerCall,
    updateVideoCallerName,
    receivingCall,
    modalShow,updateModalShow,
    handleChatwindow,
    getVideoChatRecords
  } = useContext(ChatContext);

  const handleMessage = (e) => {
    updateMessage(e.target.value);
  };

  // const handleChatwindow = (data) => {
  //   getMessages(data.friend_ID);
  //   CreateNewChat(user._id, data.friend_ID);
  // };
  const scroll = useRef();

  const sortedMessages = existingMessages.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  let lastRenderedDate = null;

  //for the autoscroll when receive a new message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [existingMessages]);

  return (
    <>
      <Container fluid>
        {/* <Row className="border-b-2">
          <Col className="flex justify-center items-center">
            <h5>Chats</h5>
          </Col>
        </Row> */}
        <Row>
          <Col
            lg={2}
            sm={0}
            md={1}
            className=" max-sm:hidden md:hidden lg:block  p-3"
          >
            <h5>Messager</h5>
            <div className="flex flex-col  gap-3">
              <button
                className="p-3 flex items-center  justify-start relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 "
                title="Save"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width="25"
                  height="24"
                >
                  <path
                    fill="#767984"
                    d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z"
                  />
                </svg>
                <span className="relative text-[#767984] font-bold ml-2">
                  {" "}
                  Home{" "}
                </span>{" "}
              </button>
              <button
                className=" p-3 flex items-center  justify-start relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0"
                title="Save"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width="25"
                  height="25"
                >
                  <path
                    fill="#767984"
                    d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
                  />
                </svg>
                <span className="relative  text-[#767984]  font-bold">
                  {" "}
                  Groups{" "}
                </span>{" "}
              </button>
              <button
                className="p-3 flex items-center  justify-start relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0"
                title="Save"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  className="w-8 hover:scale-125 duration-200 hover:stroke-blue-500"
                >
                  <path
                    fill="#767984"
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  />
                </svg>
                <span className="relative  text-[#767984]  font-bold">
                  {" "}
                  Call
                </span>{" "}
              </button>
              <button
                className="p-3 flex items-center  justify-start relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 "
                title="Save"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="25"
                  height="25"
                >
                  <path
                    fill="#767984"
                    d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
                  />
                </svg>
                <span className="relative  text-[#767984]  font-bold">
                  {" "}
                  Notification
                </span>{" "}
              </button>
            </div>
          </Col>
          <Col md={5} lg={3} className=" max-sm:hidden">
            <h5 className="p-3">Contacts</h5>
            <input
              onChange={(e) =>
                updateSearchUserforPotentialChats(e.target.value)
              }
              placeholder="Search friends name"
              className="bg-[#EAF1F9] border-2 w-full border-gray-300  text-dark px-6 py-3 text-base hover:border-gray-300 cursor-pointer transition rounded-full"
              type="text"
            />
            {potentialChat.map((item, index) => {
              return (
                <>
                  <div
                    onClick={() => handleChatwindow(item)}
                    key={index + 5}
                    className="flex items-center justify-between  rounded-r-xl bg mt-3 p-2 hover:cursor-pointer relative  "
                  >
                    <div className="flex items-center  relative px-2 py-2 rounded-l-lg">
                      <img
                        src={item.friend_dp}
                        className="object-cover rounded-full h-12 w-12"
                      />
                      <span
                        className={
                          onlineUsers?.some(
                            (user) => user.userId === item.friend_ID
                          )
                            ? "before:absolute before:flex before:top-0.5 before:left-1 before:shadow-2xl before:bg-[#34C300] before:rounded-full before:h-4 before:w-4"
                            : ""
                        }
                      ></span>
                      <div className="flex flex-col justify-start items-center">
                        <strong className="ml-2">{item.friendName}</strong>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            {loggedInUserfriend.length !== 0 &&
              loggedInUserfriend.map((item, index) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        handleChatwindow(item);
                        // updateChatWindowData(item);
                      }}
                      key={index + 5}
                      className="flex items-center justify-between active:bg-gray-300 rounded-r-xl bg mt-3 p-2 hover:cursor-pointer "
                    >
                      <div className="flex items-center  relative  active:bg-gray-300 px-2 py-2 rounded-l-lg">
                        <img
                          src={item.friend_dp}
                          className="object-cover rounded-full h-12 w-12"
                        />
                        <span
                          className={
                            onlineUsers?.some(
                              (user) => user.userId === item.friend_ID
                            )
                              ? "before:absolute before:flex before:top-0.5 before:left-1 before:shadow-2xl before:bg-[#34C300] before:rounded-full before:h-4 before:w-4"
                              : ""
                          }
                        ></span>
                        <div className="flex flex-col justify-start items-center">
                          <strong className="ml-2">{item.friendName}</strong>
                          <small className="text-left ml-2 text-muted">
                            {item.text}
                          </small>
                        </div>
                      </div>
                      <small className="text-xs text-muted">
                        {getTime(item.createdAt)}
                      </small>
                    </div>
                  </>
                );
              })}
          </Col>
          <Col xs={12} md={7}>
            <Stack direction="horizontal" gap={3}>
              <div className="p-3 flex items-center justify-between border-l-2 relative">
                {chatWindowData.friend_dp ? (
                  <img
                    src={chatWindowData.friend_dp}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <div className="animate-pulse h-10 w-10 bg-[#EAF1F9] rounded-full"></div>
                )}

                {chatWindowData.friendName ? (
                  <div className="flex flex-col ml-2">
                    <strong>{chatWindowData.friendName}</strong>
                    <span
                      className={
                        onlineUsers?.some(
                          (user) => user.userId === chatWindowData.friend_ID
                        )
                          ? "before:absolute before:flex before:top-11 before:left-10 before:shadow-2xl before:bg-[#34C300] before:rounded-full before:h-4 before:w-4"
                          : ""
                      }
                    ></span>
                    {onlineUsers?.some(
                      (user) => user.userId === chatWindowData.friend_ID
                    ) ? (
                      <small>Online</small>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col mx-2 items-start">
                    <div className="animate-pulse h-2 w-24 bg-[#EAF1F9] rounded "></div>
                    <div className="animate-pulse h-2 w-16 bg-[#EAF1F9] rounded mt-1"></div>
                  </div>
                )}
              </div>
              <div className="p-2 flex  items-center  ms-auto">
                <div className="group relative">
                  <button
                    onClick={() => {
                      updateVideoCallerName(
                        chatWindowData.friendName
                      );
                      updateModalShow(!modalShow);
                      callUser();
                    
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      className="w-8 hover:scale-125 duration-200 hover:stroke-blue-500"
                    >
                      <path
                        fill="#767984"
                        d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
                      />
                    </svg>
                  </button>
                  <span
                    className="absolute -top-14 left-[50%] -translate-x-[50%] 
                            z-20 origin-left scale-0 px-3 rounded-lg border 
  border-gray-300 bg-white py-2 text-sm font-bold
  shadow-md transition-all duration-300 ease-in-out 
  group-hover:scale-100"
                  >
                    Video call<span></span>
                  </span>
                </div>
                <div className="group relative ml-3">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      className="w-8 hover:scale-125 duration-200 hover:stroke-blue-500"
                    >
                      <path
                        fill="#767984"
                        d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                      />
                    </svg>
                  </button>
                  <span
                    className="absolute -top-14 left-[50%] -translate-x-[50%] 
                            z-20 origin-left scale-0 px-3 rounded-lg border 
  border-gray-300 bg-white py-2 text-sm font-bold
  shadow-md transition-all duration-300 ease-in-out 
  group-hover:scale-100"
                  >
                    Call<span></span>
                  </span>
                </div>
              </div>
            </Stack>
            <div className="bg-[#EAF1F9]">
              <div className=" overflow-auto h-[37em]  px-2">
                <div className="flex flex-col justify-center items-center p-2">
                  {chatWindowData.friend_dp ? (
                    <img
                      src={chatWindowData.friend_dp}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <div className=" animate-pulse h-10 w-10 bg-[#F8F9FA] rounded-full"></div>
                  )}
                  {chatWindowData.friend_dp ? (
                    <>
                      <strong>{chatWindowData.friendName}</strong>
                      <small className="text-muted">Socialbook</small>
                      <small className="text-muted">
                        You're friends on socialbook
                      </small>
                    </>
                  ) : (
                    <div className="flex flex-col mx-2 items-center">
                      <div className="animate-pulse h-2 w-24 bg-[#F8F9FA] rounded "></div>
                      <div className="animate-pulse h-2 w-32 bg-[#F8F9FA] rounded mt-1"></div>
                    </div>
                  )}
                </div>
                {sortedMessages.map((message, index) => {
                  const isCurrentUser = message.senderId === user._id;
                  const alignClass = isCurrentUser
                    ? "justify-end"
                    : "justify-start";
                  const messageContainerClass = isCurrentUser
                    ? "bg-[#F0F2F5] flex-col"
                    : "bg-[#F0F2F5]";
                  const currentDate = new Date(
                    message.createdAt
                  ).toLocaleDateString();
                  const shouldRenderDate = currentDate !== lastRenderedDate;
                  lastRenderedDate = currentDate;

                  return (
                    <>
                      {shouldRenderDate && (
                        <div className="flex items-center justify-center">
                          <small className="text-muted text-xs shadow-md rounded-md p-1 bg-[#F8F9FA]">
                            {currentDate}
                          </small>
                        </div>
                      )}

                      <div
                        key={index}
                        className={`flex items-start ${alignClass} mt-2 `}
                        ref={scroll}
                      >
                        {!isCurrentUser && (
                          <img
                            src={message.senderDp}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}

                        <div
                          className={`flex flex-col  p-2  ${messageContainerClass}`}
                        >
                          <small className="text-muted text-xs rounded-2xl  bg-[#EAF1F9]">
                            {getTime(message.createdAt)}
                          </small>

                          <strong className="text-center p-2 shadow-md rounded-xl bg-[#F8F9FA] mt-2">
                            {message.text}
                          </strong>
                        </div>
                        {isCurrentUser && (
                          <img
                            src={message.senderDp}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="relative mt-6 p-2">
                <input
                  onChange={handleMessage}
                  type="text"
                  placeholder="type message..."
                  autocomplete="text"
                  aria-label="text message"
                  className=" block w-full rounded-2xl border border-neutral-300  py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                />
                <div className="absolute inset-y-1 right-1 flex justify-end p-2">
                  <button
                    onClick={() => {
                      sendMessage(user._id, chatWindowData.friend_ID);
                      updateMessage("");
                    }}
                    aria-label="Submit"
                    className="flex aspect-square h-full items-center justify-center rounded-xl bg-[#E6EEFB] text-white transition hover:bg-neutral-600"
                  >
                    <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <CallCard/>
    
    </>
  );
};

export default ChatPage;
