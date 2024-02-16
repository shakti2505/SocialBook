import React, { useContext, useEffect, useState } from 'react'
import UserDataContext from '../Context/UserContext.js';
import axios from "axios";
import { apiVariables } from "../utilities/apiVariables.js";
import BASE_URL_API from "../utilities/baseURL.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from 'react-bootstrap/Spinner';

const PostModal = (props) => {
    const [posts, setposts] = useState([]);

    const [seeMore, setseeMore] = useState(false)
    const [postURls, setPostUrls] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalPosts, setTotalPost] = useState(0)
    const { loggedInUser } = useContext(UserDataContext);
    // const { posts } = useContext(UserDataContext);

    const ConvertDateTime = (DateTime) => {
        return new Date(DateTime).toLocaleString();
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

    useEffect(() => {
        getPosts();
    }, [])

    useEffect(() => {
        console.log('hasmore', posts.length < totalPosts)
        console.log('post.lenght', posts.length)
        console.log('total post', totalPosts)
    }, [posts.length, totalPosts])
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
                        <div className='card mt-3 mx-5 shadow-sm d-flex'>
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
                        </div>
                        // </div>
                        // </div>
                    );
                })}
            </InfiniteScroll>
            {/* <div className='card mt-3 w-100 shadow-sm'>
                <div className='card-body'>

                </div>
            </div> */}
        </>
    )
}

export default PostModal