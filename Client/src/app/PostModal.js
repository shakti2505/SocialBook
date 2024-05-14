import React, { useContext, useEffect, useState } from "react";
import UserDataContext from "../Context/UserContext.js";
import axios from "axios";
import { apiVariables } from "../utilities/apiVariables.js";
import BASE_URL_API from "../utilities/baseURL.js";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import EmojiPicker from "emoji-picker-react";
import paperPlane from "../images/Icon/paper-plane.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PostModal = () => {
  const [posts, setposts] = useState([]);
  const [PostID, setPostID] = useState("");
  const [postComments, setPostCommnets] = useState([]);
  const [openCmtModal, setOpenCmtModal] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(
    Array(posts.length).fill(false)
  );
  const [commentSectionOpen, setcommentSectionOpen] = useState(
    Array(posts.length).fill(false)
  );

  const [LikePost, setLikePost] = useState(Array(posts.length).fill(false));

  const [seeMore, setseeMore] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPosts, setTotalPost] = useState(0);
  const [comment, setComment] = useState("");
  const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [likeColor, setLikeColor] = useState("#e9eaed");
  const { loggedInUser } = useContext(UserDataContext);
  // const { posts } = useContext(UserDataContext);

  const ConvertDateTime = (DateTime) => {
    return new Date(DateTime).toLocaleString();
  };

  const concateCommentWithEmoji = (emoji) => {
    setComment((prevComment) => prevComment + emoji);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSection = (index) => {
    const newCommentSectionOpen = [...commentSectionOpen];
    newCommentSectionOpen[index] = !newCommentSectionOpen[index];
    setcommentSectionOpen(newCommentSectionOpen);
  };

  const handleEmojiPickerToggle = (index) => {
    const newEmojiPickerOpen = [...emojiPickerOpen];
    newEmojiPickerOpen[index] = !newEmojiPickerOpen[index];
    setEmojiPickerOpen(newEmojiPickerOpen);
  };

  const getPosts = () => {
    const limit = 5;
    axios
      .get(BASE_URL_API + apiVariables.getPosts.url, {
        params: {
          page: activePage,
          pageSize: limit,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status !== 200) {
        } else {
          setTotalPost(response.data.total);
          setActivePage(activePage + 1);
          setposts([...posts, ...response.data.posts]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikePost = async (postID) => {
    const apicall = await axios.post(
      BASE_URL_API + apiVariables.likePost.url,
      {
        postID: postID,
      },
      { withCredentials: "include" }
    );
    if (apicall.status !== 200) {
      console.log("unable to like the post!");
    } else {
      console.log("like api response", apicall.data);
      getPosts();
    }
  };

  const likePost = (index, postid) => {
    handleLikePost(postid);
    const newLikePost = [...LikePost];
    newLikePost[index] = !newLikePost[index];
    setLikePost(newLikePost);
    setLikeColor("#1049f4");
  };

  const getDays = (dateTime) => {
    const currentDate = Date.now();
    const dt = new Date(dateTime).getTime();
    const millisec = dt - currentDate;

    const hours = Math.abs(millisec) / (1000 * 60 * 60);
    const minutes = Math.abs(millisec) / (1000 * 60);
    if (hours >= 24) {
      return `${Math.floor(hours / 24)} Days ago`; // return days
    } else if (hours >= 1) {
      return `${Math.floor(hours)} hours ago`; // return hours
    } else {
      return `${Math.floor(minutes)} minutes ago`; // return minutes
    }
  };

  const getPostComments = (PostID) => {
    axios
      .get(BASE_URL_API + apiVariables.getPostComments.url, {
        params: {
          postID: PostID ? PostID : "",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status !== 200) {
        } else {
          // setFirstComment(response.data.allComments[0]);
          setPostCommnets((prevComment) =>
            prevComment.concat(response.data.allComments)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const create_comment = async (postID, LoggedInUserDp, userName) => {
    const apicall = await axios.post(
      BASE_URL_API + apiVariables.createComments.url,
      {
        postID: postID,
        comment: comment,
        LoggedInUserDp: LoggedInUserDp,
        LoggedInUserName: userName,
      },
      { withCredentials: "include" }
    );

    if (apicall.status !== 201) {
      alert("Unable to comment on post");
    } else {
      setComment("");
      getPostComments(postID);
    }
  };

  const handleCmtModal = (postid) => {
    setPostCommnets([]);
    setPostID(postid);
    setOpenCmtModal(true);
    getPostComments(postid);
  };

  const handleCloseCmtModal = () => {
    setOpenCmtModal(false);
    setPostCommnets([]);
    getPostComments();
  };

  useEffect(() => {
    getPosts();
    getPostComments();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={getPosts}
        hasMore={posts.length < totalPosts}
        loader={<Spinner animation="border" variant="primary" />}
        endMessage={
          <p className="text-center mt-1">
            <b>Wow! You have seen it all!</b>
          </p>
        }
      >
        {posts.length !== 0 &&
          posts.map((item, index) => {
            return (
              <>
                <div className="card mt-4 shadow-sm d-flex" key={item._id}>
                  <div className="card-body">
                    <div className="d-flex">
                      <a href="/profile">
                        <img
                          src={item.postOwnerDP}
                          className="ml-1 rounded-full h-12 w-12 object-cover "
                        />
                      </a>
                      <div className="d-flex flex-column">
                        <strong className="mx-2">{item.postOwner}</strong>
                        <p style={{ fontSize: "0.8rem" }} className="mx-2">
                          {ConvertDateTime(item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p>{item.postCaption}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    {item.postImagesURls.length !== 0 &&
                      item.postImagesURls.map((previewUrl, index) => {
                        return (
                          <div key={index + 1}>
                            <img
                              src={previewUrl}
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                              }}
                              className="mt-1"
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-1 text-muted">
                      {/* {item.LikedBy[0]?.name} and {item.likeCount!==1 &&  `${item.likeCount-1} others`}   */}
                      {item.likeCount === 1
                        ? item.LikedBy[0]?.name
                        : item.likeCount > 1
                        ? `${item.LikedBy[0]?.name} and ${
                            item.likeCount - 1
                          } others`
                        : ""}
                    </span>

                    {postComments.filter((citem) => citem.postID === item._id)
                      .length !== 0 && (
                      <button
                        className={
                          item.totalComments != 0
                            ? "btn btn-link text-decoration-none text-muted"
                            : "btn btn-link text-decoration-none text-muted"
                        }
                        onClick={() => handleCmtModal(item._id)}
                      >
                        {
                          postComments.filter(
                            (citem) => citem.postID === item._id
                          ).length
                        }
                          Comments
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => likePost(index, item._id)}
                      className="btn btn-light btn-sm mx-1 d-flex align-items-center justify-content-center"
                    >
                      {item.LikedBy.filter(
                        (i) => i.user_id === loggedInUser._id
                      ).length !== 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width="25"
                          height="25"
                        >
                          <path
                            fill="#1049f4"
                            d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width="25"
                          height="25"
                        >
                          <path
                            fill={LikePost[index] && likeColor}
                            d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
                          />
                        </svg>
                      )}

                      <strong className="text-muted mx-2">Like</strong>
                    </button>
                    <button
                      onClick={() => handleCommentSection(index)}
                      className="btn btn-light btn-sm mx-1 d-flex align-items-center justify-content-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        height="25"
                        width="25"
                      >
                        <path
                          fill="#686E77"
                          d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
                        />
                      </svg>
                      <strong className=" text-muted mx-2">Comment</strong>
                    </button>
                    <button className="btn btn-light btn-sm  mx-1 d-flex align-items-center justify-content-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="25"
                        height="25"
                      >
                        <path
                          fill="#686E77"
                          d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
                        />
                      </svg>
                      <strong className=" text-muted mx-2">Send</strong>
                    </button>
                  </div>
                  <hr className="m-2"></hr>
                  {/* {postComments.length !== 0 && 
                      postComments.map((Citem, 
                        ) => {
                        return (
                          <>
                            {(Citem.postID === item._id) && (
                              <div className="d-flex align-items-center m-2">
                                <img
                                  src={Citem.userDP}
                                  width="25"
                                  height="25"
                                  style={{ borderRadius: "50%" }}
                                  className="mx-2"
                                />
                                <div
                                  className="shadow-md"
                                  style={{
                                    backgroundColor: "#F0F2F5",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <small className="mx-2">
                                    {Citem.userName}
                                  </small>
                                  <p className="mx-2">{Citem.comment}</p>
                                  <small
                                    className="mx-2"
                                    style={{ color: "#0866FF" }}
                                  >
                                    {getDays(Citem.createdAt)}
                                  </small>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })} */}
                  {postComments.length !== 0 &&
                    postComments
                      .filter((citem) => citem.postID === item._id)
                      .map((item, index) => {
                        return (
                          <>
                            {index === 0 && (
                              <div className="d-flex align-items-center m-2">
                                <img
                                  src={item.userDP}
                                  // width="25"
                                  // height="25"
                                  // style={{ borderRadius: "50%" }}
                                  className="ml-1 rounded-full h-12 w-12 object-cover "
                                />
                                <div
                                  className="shadow-md"
                                  style={{
                                    backgroundColor: "#F0F2F5",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <small className="mx-2">
                                    {item.userName}
                                  </small>
                                  <p className="mx-2">{item.comment}</p>
                                  <small
                                    className="mx-2"
                                    style={{ color: "#0866FF" }}
                                  >
                                    {getDays(item.createdAt)}
                                  </small>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}

                  {/* <hr className="m-2"></hr> */}
                  {/* comment input starts */}
                  {commentSectionOpen[index] && (
                    <div className="d-flex flex-row mb-2">
                      <a className="mx-2" href="/profile">
                        <img
                          src={loggedInUser.profilePic}
                          className="mx-2 rounded-full h-12 w-12 object-cover"
                        />
                      </a>
                      <div className="w-100 mx-2 d-flex flex-column   m-0">
                        <textarea
                          value={comment}
                          onChange={handleCommentChange}
                          placeholder="Write a comment...."
                          className="w-full flex items-center outline-0	text-lg bg-[#F0F2F5] border-0 rounded-t-lg resize-none overflow-hidden px-2"
                        ></textarea>
                        <div
                          className="d-flex justify-content-between align-items-center"
                          style={{ backgroundColor: "#F0F2F5" }}
                        >
                          <div className="d-flex">
                            <button
                              disabled={comment.length !== 0 ? false : true}
                              className="p-1"
                              style={{
                                backgroundColor: "#F0F2F5",
                                outline: "none",
                                borderTopRightRadius: "17px",
                                border: "0",
                                borderBottomRightRadius: "17px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                width="20"
                                height="20"
                              >
                                <path
                                  fill="#686E77"
                                  d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleEmojiPickerToggle(index)}
                              className="p-1"
                              style={{
                                backgroundColor: "#F0F2F5",
                                outline: "none",
                                borderTopRightRadius: "17px",
                                border: "0",
                                borderBottomRightRadius: "17px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                width="20"
                                height="20"
                              >
                                <path
                                  fill="#686E77"
                                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                                />
                              </svg>
                            </button>
                            <button
                              className="p-1"
                              style={{
                                backgroundColor: "#F0F2F5",
                                outline: "none",
                                borderTopRightRadius: "17px",
                                border: "0",
                                borderBottomRightRadius: "17px",
                              }}
                            >
                              <div
                                style={{
                                  border: "2px solid grey",
                                  borderRadius: "5px",
                                  fontSize: "10px",
                                }}
                              >
                                <small
                                  className="text-muted"
                                  style={{ margin: "2px" }}
                                >
                                  GIF
                                </small>
                              </div>
                            </button>
                            <button
                              className="p-1"
                              style={{
                                backgroundColor: "#F0F2F5",
                                outline: "none",
                                borderTopRightRadius: "17px",
                                border: "0",
                                borderBottomRightRadius: "17px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                width="20"
                                height="20"
                              >
                                <path
                                  fill="#686E77"
                                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                                />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              create_comment(
                                item._id,
                                loggedInUser.profilePic,
                                loggedInUser.firstName +
                                  " " +
                                  loggedInUser.LastName
                              )
                            }
                            disabled={comment.length !== 0 ? false : true}
                            className="p-2"
                            style={{
                              backgroundColor: "#F0F2F5",
                              outline: "none",
                              borderTopRightRadius: "17px",
                              border: "0",
                              borderBottomRightRadius: "17px",
                            }}
                          >
                            <img src={paperPlane} width="25" height="25" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* comment input  ends*/}
                  {emojiPickerOpen[index] && (
                    <EmojiPicker
                      onEmojiClick={(e) => concateCommentWithEmoji(e.emoji)}
                      emojiStyle="facebook"
                      width="100%"
                    />
                  )}
                </div>
              </>
            );
          })}
      </InfiniteScroll>

      <Modal
        show={openCmtModal}
        onHide={handleCloseCmtModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Commments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {postComments.length !== 0 &&
            postComments.map((Citem) => {
              return (
                <>
                  {Citem.postID === PostID && (
                    <div className="d-flex  m-2">
                      <img
                        src={Citem.userDP}
                        // width="25"
                        // height="25"
                        // style={{ borderRadius: "50%" }}
                        className="mx-2 rounded-full h-12 w-12"
                      />
                      <div
                        className="shadow-md"
                        style={{
                          backgroundColor: "#F0F2F5",
                          borderRadius: "10px",
                        }}
                      >
                        <small className="mx-2">{Citem.userName}</small>
                        <p className="mx-2">{Citem.comment}</p>
                        <small className="mx-2" style={{ color: "#0866FF" }}>
                          {getDays(Citem.createdAt)}
                        </small>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCmtModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;
