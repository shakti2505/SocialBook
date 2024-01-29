import Navbar from './Navbar.js'
import { useState } from 'react';
import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import user1 from './images/user1.jpg'
import user2 from './images/user2.jpg'
import user3 from './images/user3.jpg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import event1 from './images/event1.jpg'
import eventp1 from './images/eventp1.jpg'
import { useContext } from 'react';
import UserDataContext from './Context/UserContext.js';
import axios from 'axios';
import { apiVariables } from './utilities/apiVariables.js';
import BASE_URL_API from './utilities/baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SidebarV2 = () => {
    const [userData, setUserdata] = useState()
    const [postPicture, setPostPicture] = useState([]);
    const [postCaption, setPostCaption] = useState('')
    const [imagePreviews, setImagePreviews] = useState([]);


    const notify = (message) => toast(message);
    const user = useContext(UserDataContext)

    const [UserProfilePicture, setUserProfilePicture] = useState([])
    const changeBodybg = () => {
        document.body.style.backgroundColor = "white"
        document.body.style.height = '0px'
    }
    const getUserProfilePicture = () => {
        axios.get(BASE_URL_API + apiVariables.userProfilePicture.url, {
            withCredentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then((response) => {
                if (response.data.message == 'Image not found') {
                    console.log(response.data.message)
                } else {
                    setUserProfilePicture(response.data)
                }
            }).catch((err) => {
                console.log(err)
            })

    }
    const handlePostCaption = (e) => {
        setPostCaption(e.target.value);
    }
    const handleRemoveImage = (index) => {
        const updatedFiles = postPicture.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        setPostPicture(updatedFiles);
        setImagePreviews(updatedPreviews);
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setPostPicture((prevFiles) => [...prevFiles, ...selectedImages]);
        // Map through selected images to create image previews
        const imagePreviewUrls = selectedImages.map((image) => URL.createObjectURL(image));

        // Update state by concatenating new previews with existing ones
        setImagePreviews((prevPreviews) => [...prevPreviews, ...imagePreviewUrls]);
    };

    const uplaodPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        postPicture.forEach((picture, index) => {
            formData.append('images', picture)
        })
        formData.append('postCaption', postCaption)
        console.log([...formData.entries()])
        const apicall = await axios.post(BASE_URL_API + apiVariables.createPost.url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: "include"
        })
        if (apicall.status = !201) {
            notify("error in uploading Post");
        } else {
            setImagePreviews([])
            notify('Post uploaded succesfully!')
        }
    }


    const convertedProfilePicture =
        UserProfilePicture.map((singleData) => {
            const base64String = btoa(
                String.fromCharCode(...new Uint8Array(singleData.file.data.data))
            );
            return `data:image/jpeg;base64,${base64String}`
        })


    useEffect(() => {
        changeBodybg();
        getUserProfilePicture()
    }, [])

    useEffect(() => {
        setUserdata(user)
    }, [user])

    return (
        <>
            <Navbar />
            <div className='row'>
                <div className='col-6 col-s-3 post d-flex flex-row'>
                    <div>
                        <img className='profilePic' alt='' src={convertedProfilePicture} />
                    </div>
                    <Form.Control as="textarea" placeholder="What's happening?" onChange={handlePostCaption} />
                    <Form.Control type="file" name='images'  onChange={handleImageChange} multiple />
                </div>
            </div>
        </>

    )
}

export default SidebarV2