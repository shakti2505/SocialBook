import React, { useContext, useState } from 'react'
import UserDataContext from '../Context/UserContext.js';

const PostModal = (props) => {
    const [seeMore, setseeMore] = useState(false)
    const loggedInUser = useContext(UserDataContext);

    const ConvertDateTime = (DateTime) => {
        return new Date(DateTime).toLocaleString();
    }

    return (
        <>
            {props.uploadedPost.length !== 0 && props.uploadedPost.map((item, index) => {
                return (
                    <div key={Math.random() + index} className="d-flex justify-content-center">
                        <div className='postContainer'>
                            <div className='d-flex mx-2 mt-3'>
                                <img src={loggedInUser.profilePic} width='40' height='40' style={{ borderRadius: "50%", objectFit:"cover" }} />
                                <div className='d-flex flex-column'>
                                    <strong className='mx-2 '>{loggedInUser.firstName} {loggedInUser.LastName}</strong>
                                    <p style={{ fontSize: '0.8rem' }} className='mx-2'>{ConvertDateTime(item.createdAt)}</p>
                                </div>
                            </div>
                            <p className='p-2'>{seeMore ? item.postCaption : `${item.postCaption.substring(0, 250)}`}
                            </p>
                            {item.postImagesURls.length !== 0 &&
                                <div className='d-flex flex-row vh-50' style={{ borderRadius: "10px", position: 'relative',  }}>
                                    {
                                        item.postImagesURls.map((previewUrl, index) => (
                                            <div key={index + Math.random()}  >
                                                <img src={previewUrl} style={{ height: "100%", width: "100%" ,objectFit:"cover"}} />
                                            </div>
                                        ))}
                                </div>
                            }
                        </div>
                    </div>
                );
            })}

        </>
    )
}

export default PostModal