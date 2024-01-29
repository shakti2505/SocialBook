import React, { useState } from 'react'

const PostModal = (props) => {
    const [seeMore, setseeMore] = useState(false)

    return (
        <>
            {props.uploadedPost.length !== 0 && props.uploadedPost.map((item, index) => {
                return (
                    <div key={Math.random() + index} className="d-flex justify-content-center">
                        <div className='postContainer'>
                            <div className='d-flex mx-2 mt-2'>
                                {props.convertedProfilePicture.map((item, index) => {
                                    return (
                                        <>
                                            <img src={item.displayPictureUrl} alt='img' width='40' height='40' style={{ borderRadius: "50px" }} />

                                        </>
                                    )
                                })
                                }
                                <div className='d-flex flex-column'>
                                    <strong className='mx-2 '>Sunny Kashyap</strong>
                                    <p className='mx-2'>11 janunary at 11:59</p>
                                </div>
                            </div>
                            <p className='p-2'>{seeMore ? item.postCaption : `${item.postCaption.substring(0, 250)}`}
                            </p>
                            {item.postImagesURls.length !== 0 &&
                                <div className='d-flex flex-row vh-50' style={{ borderRadius: "10px", position: 'relative' }}>
                                    {
                                        item.postImagesURls.map((previewUrl, index) => (
                                            <div key={index + Math.random()}  >
                                                <img src={previewUrl} style={{ height: "100%", width: "100%" }} />
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