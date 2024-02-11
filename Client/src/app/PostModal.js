import React, { useContext, useEffect, useState } from 'react'
import UserDataContext from '../Context/UserContext.js';

const PostModal = (props) => {
    const [seeMore, setseeMore] = useState(false)
    const [postURls, setPostUrls] = useState([])
    const { loggedInUser } = useContext(UserDataContext);
    const { posts } = useContext(UserDataContext);

    const ConvertDateTime = (DateTime) => {
        return new Date(DateTime).toLocaleString();
    }
    useEffect(() => {
        posts.map((item) => {
            setPostUrls(item.postImagesURls)
        }, [posts])
    })

    return (
        <>
            {posts.length !== 0 && posts.map((item, index) => {
                return (
                    // <div key={Math.random() + index} className="d-flex justify-content-center mx-2 mt-2 ">
                    // <div key={Math.random() + index} className='postContainer shadow'>
                    <div className='card mt-3 w-100 shadow-sm'>
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
                            {/* <p className='p-2'>{seeMore ? item.postCaption : `${item.postCaption.substring(0, 250)}`}
                            </p> */}
                            <p>{item.postCaption}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            {item.postImagesURls.length !== 0 &&
                                item.postImagesURls.map((previewUrl, index) => {
                                    return (
                                        <div key={index+1}>
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
            {/* <div className='card mt-3 w-100 shadow-sm'>
                <div className='card-body'>

                </div>
            </div> */}
        </>
    )
}

export default PostModal