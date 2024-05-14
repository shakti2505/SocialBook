import React, { useContext, useEffect, useState, useRef } from "react";
import UserDataContext from "../Context/UserContext";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";

const RightBar = () => {
  const { loggedInUserfriend, loggedInUser } = useContext(UserDataContext);
  const [openChatwindow, setOpenChatwindow] = useState(false);
  const [chatWindowData, setChatWindowData] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setmessage] = useState("");
  const target = useRef(null);
  const handleChatwindow = (data) => {
    setOpenChatwindow(true);
    setChatWindowData(data);
  };

  const handleMessage = (e) => {
    setmessage(e.target.value);
  };

 


  
  return (
    <>
      <div className="col-4 sticky h-[100vh] overflow-y-auto p-4 top-0 max-sm:hidden">
        <div className="flex justify-between items-center">
          <div>
            <h4>Contacts</h4>
          </div>
          <div className="flex justify-between items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20"
              height="20"
              className="mr-10"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
            >
              <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
            </svg>
          </div>
        </div>
        {loggedInUserfriend.length !== 0 &&
          loggedInUserfriend.map((item, index) => {
            return (
              <>
                <button
                  onClick={() => handleChatwindow(item)}
                  key={index + 5}
                  className="flex items-center mt-2  active:bg-gray-300 px-2 py-2 rounded-xl w-full"
                >
                  <img
                    src={item.friend_dp}
                    className="object-cover rounded-full h-12 w-12"
                  />
                  <p className="ml-2">{item.friendName}</p>
                </button>
              </>
            );
          })}

        <div
          className={
            openChatwindow
              ? "absolute bottom-0 left-0 border-1 w-75 border-grey overflow-hidden rounded-md transition-all h-1/2 shadow-lg rea"
              : "hidden"
          }
        >
          <div className="flex justify-between items-center shadow-sm  p-2">
            <button className="flex">
              <img
                src={chatWindowData.friend_dp}
                className="  object-cover w-12 h-12 rounded-full"
              />
              <div className="flex flex-column ml-2">
                <span>{chatWindowData.friendName}</span>
                <small className="text-muted">Active now</small>
              </div>
            </button>
            <div className="flex justify-between items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="20"
                height="20"
              >
                <path
                  fill="#0866FF"
                  d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="20"
                height="20"
              >
                <path
                  fill="#0866FF"
                  d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="20"
                height="20"
              >
                <path
                  fill="#0866FF"
                  d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="20"
                height="20"
              >
                <path
                  fill="#0866FF"
                  d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-5">
            <img
              src={chatWindowData.friend_dp}
              className="object-cover w-16 h-16 rounded-full"
            />
            <strong>{chatWindowData.friendName}</strong>
            <small className="text-muted">Socialbook</small>
            <small className="text-muted">You're friends on socialbook</small>
          </div>
          <div className="flex justify-between items-center bottom-0 absolute w-full mb-2">
            {message.length === 0 && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#0866FF"
                    d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"
                  />
                </svg>
                <label
                  htmlFor="file"
                  className="flex flex-col justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="20"
                    height="20"
                    className="ml-2"
                  >
                    <path
                      fill="#0866FF"
                      d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-#.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpg, image/jpeg , image/bmp"
                  className="hidden"
                  id="file"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="25"
                  height="25"
                  className="ml-2"
                >
                  <path
                    fill="#0866FF"
                    d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                  />
                </svg>
              </>
            )}

            <textarea
              rows="1"
              onChange={handleMessage}
              type="text"
              disabled
              placeholder="I am developing the feature!"
              className={`outline-none h-full rounded-xl p-1 bg-gray-200 ml-2 mr-2 ${
                message.length === 0 ? "w-2/3" : "w-full"
              } transition-width duration-300`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="25"
              height="25"
              className={message.length == 0 ? "" : "d-none"}
            >
              <path
                fill="#0866FF"
                d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="25"
              height="25"
              className={message.length == 0 ? "d-none" : ""}

            >
              <path
                fill="#0866FF"
                d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
