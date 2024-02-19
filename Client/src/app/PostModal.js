import React, { useContext, useEffect, useState } from 'react'
import UserDataContext from '../Context/UserContext.js';
import axios from "axios";
import { apiVariables } from "../utilities/apiVariables.js";
import BASE_URL_API from "../utilities/baseURL.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from 'react-bootstrap/Spinner';
import EmojiPicker, { Emoji } from 'emoji-picker-react';

const PostModal = (props) => {
    const [posts, setposts] = useState([]);

    const [seeMore, setseeMore] = useState(false)
    const [postURls, setPostUrls] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalPosts, setTotalPost] = useState(0)
    const [comment, setComment] = useState('')
    const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false)
    const { loggedInUser } = useContext(UserDataContext);
    // const { posts } = useContext(UserDataContext);

    const ConvertDateTime = (DateTime) => {
        return new Date(DateTime).toLocaleString();
    }

    const concateCommentWithEmoji = (emoji) => {
        setComment(prevComment => prevComment + emoji);
    }

    const handleEmojiPicker = (Post_id) =>{
        if(Post_id){

        }
        setOpenEmojiPicker(!OpenEmojiPicker);
    }

    const getPosts = () => {
        const limit = 13;
        axios.get(BASE_URL_API + apiVariables.getPosts.url, {
            params: {
                page: activePage,
                pageSize: limit
            },
            withCredentials: true
        })
            .then((response) => {
                console.log(response)
                if (response.status !== 200) {
                } else {
                    setTotalPost(response.data.total)
                    setActivePage(activePage + 1)
                    setposts([...posts, ...response.data.posts])

                }
            }).catch((err) => {
                console.log(err)
            })
    }


    const create_comment = async (postID, LoggedInUserDp, userName) => {
        console.log(postID, LoggedInUserDp, userName)
        const apicall = await axios.post(BASE_URL_API + apiVariables.createComments.url, {
            postID: postID,
            comment: comment,
            LoggedInUserDp: LoggedInUserDp,
            LoggedInUserName: userName

        }, { withCredentials: "include" });

        if (apicall.status !== 201) {
            alert("Unable to comment on post")
        } else {
            console.log('comments response::', apicall.data)
        }
    }


    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
            <InfiniteScroll
                dataLength={posts.length}
                next={getPosts}
                hasMore={posts.length < totalPosts}
                loader={
                    <Spinner animation="border" variant="primary" />
                }
                endMessage={
                    <p className='text-center mt-1'>
                        <b>Wow! You have seen it all!</b>
                    </p>
                }

            >
                {posts.length !== 0 && posts.map((item, index) => {
                    return (
                        // <div key={Math.random() + index} className="d-flex justify-content-center mx-2 mt-2 ">
                        // <div key={Math.random() + index} className='postContainer shadow'>
                        <div className='card mt-3 mx-5 shadow-sm d-flex' key={item._id+index}>
                            <div className='card-body'>
                                <div className='d-flex'>
                                    <a href='/profile'>
                                        <img src={loggedInUser.profilePic} width='40' height='40' style={{ borderRadius: "50%", objectFit: "cover" }} className='mt-1' />

                                    </a>
                                    <div className='d-flex flex-column'>
                                        <strong className='mx-2'>{loggedInUser.firstName} {loggedInUser.LastName}</strong>
                                        <p style={{ fontSize: '0.8rem' }} className='mx-2'>{ConvertDateTime(item.createdAt)}</p>
                                    </div>
                                </div>
                                <p>{item.postCaption}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                {item.postImagesURls.length !== 0 &&
                                    item.postImagesURls.map((previewUrl, index) => {
                                        return (
                                            <div key={index + 1}>
                                                <img src={previewUrl} style={{ height: "100%", width: "100%", objectFit: "cover" }} className='mt-1' />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <hr className='m-2'></hr>
                            <div className='d-flex align-items-center justify-content-between'>
                                <button className='btn btn-light w-100 mx-1 d-flex align-items-center justify-content-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25"><path fill='#686E77' d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" /></svg> <strong className=' text-muted mx-2'>Like</strong>
                                </button>
                                <button className='btn btn-light w-100 mx-1 d-flex align-items-center justify-content-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="25" width="25"><path fill='#686E77' d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>
                                    <strong className=' text-muted mx-2'>Comment</strong>
                                </button>
                                <button className='btn btn-light w-100 mx-1 d-flex align-items-center justify-content-center '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25"><path fill='#686E77' d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" /></svg>
                                    <strong className=' text-muted mx-2'>Send</strong>
                                </button>
                            </div>
                            <hr className='m-2'></hr>
                            {/* comment input starts */}
                            <div className='d-flex flex-row mb-2'>
                                <a className='mx-2' href='/profile'>
                                    <img src={loggedInUser.profilePic} width='40' height='40' style={{ borderRadius: "50%", objectFit: "cover" }} />
                                </a>
                                <div className='w-100 mx-2 d-flex flex-column   m-0'>
                                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Write a comment....' className='w-100 d-flex align-items-center' style={{ outline: "none", fontSize: '15px', backgroundColor: "#F0F2F5", border: "0", borderTopLeftRadius: "17px", borderTopRightRadius: "17px", resize: "none", overflow: 'hidden' }} >
                                    </textarea>
                                    <div className='d-flex justify-content-between align-items-center' style={{ backgroundColor: "#F0F2F5" }}>
                                        <div className='d-flex'>
                                            <button disabled={comment.length !== 0 ? false : true} className='p-1' style={{ backgroundColor: "#F0F2F5", outline: "none", borderTopRightRadius: "17px", border: "0", borderBottomRightRadius: "17px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20"><path fill='#686E77' d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></svg>
                                            </button>
                                            <button onClick={handleEmojiPicker(item._id)} className='p-1'  style={{ backgroundColor: "#F0F2F5", outline: "none", borderTopRightRadius: "17px", border: "0", borderBottomRightRadius: "17px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path fill='#686E77' d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                                            </button>
                                            <button className='p-1' style={{ backgroundColor: "#F0F2F5", outline: "none", borderTopRightRadius: "17px", border: "0", borderBottomRightRadius: "17px" }}>
                                                <div style={{ border: "2px solid grey", borderRadius: "5px", fontSize:"10px" }} ><small  className='text-muted' style={{margin:"2px"}}>GIF</small></div>
                                            </button>
                                            <button  className='p-1' style={{ backgroundColor: "#F0F2F5", outline: "none", borderTopRightRadius: "17px", border: "0", borderBottomRightRadius: "17px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path fill='#686E77' d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <EmojiPicker  open={OpenEmojiPicker} onEmojiClick={(e) => concateCommentWithEmoji(e.emoji)} emojiStyle='facebook' width="100%" />
                            {/* comment input  ends*/}
                        </div>
                        // </div>
                        // </div>
                    );
                })}
            </InfiniteScroll>

        </>
    )
}

export default PostModal