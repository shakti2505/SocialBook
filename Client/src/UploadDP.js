import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { apiVariables } from './utilities/apiVariables';
import BASE_URL_API from './utilities/baseURL';
import { useNavigate } from "react-router-dom"

const UploadDP = () => {
  const [displayPicture, setDisplayPicture] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isloading, setisloading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const selectedImage = Array.from(e.target.files)
    setDisplayPicture((prevFiles) => [...prevFiles, ...selectedImage]);
    const imagePreviewUrls = selectedImage.map((image) => URL.createObjectURL(image));
    console.log(imagePreviewUrls)
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imagePreviewUrls]);
  }

  const removeDp = () =>{
    
  }
  const uploadDP = async (e) => {
    try {
      // document.getElementById('postbtn').setAttribute('disabled', 'true');
      setisloading(true)
      let imageURL = []
      let formData = new FormData();
      formData.append('upload_preset', "SocialBook_SB");
      formData.append('folder', "Profile Picture");
      formData.append('cloud_name', 'dtbz1n84e');
      const uploadPromises = displayPicture.map(async (item) => {
        formData.append('file', item);
        let response1 = await fetch('https://api.cloudinary.com/v1_1/dtbz1n84e/image/upload', {
          method: "post",
          body: formData
        });
        if (!response1.ok) {
          throw new Error('Failed to upload images');
        }

        const data = await response1.json();
        console.log('', data.url);
        imageURL.push(data.url);
      });

      // Wait for all upload promises to resolve
      await Promise.all(uploadPromises);
      const response2 = await axios.post(BASE_URL_API + apiVariables.uploadDP.url, {
        displayPictureUrl: imageURL,
      }, { withCredentials: "include" })

      if (response2.status != 201) {
        throw new Error('Failed to fetch result data');
      }
      const uploadedPost = await response2;
      document.getElementById('postbtn').setAttribute('disabled', 'true');
      setisloading(false);
      setImagePreviews([])
    } catch (error) {
      console.log("error", error.message)
    }

    // const formData = new FormData()
    // displayPicture.map((image) => {
    //   formData.append('image', image)

    // })
    // formData.append('image', displayPicture)
    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // };
    // const apicall = axios.post(BASE_URL_API + apiVariables.uploadDP.url, formData, {
    //   withCredentials: 'include',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Credentials': true
    //   }
    // })
    // apicall.then((response) => {
    //   if (response.status == 201) {
    //     // navigate('/home')
    //     alert('DP uploaded!')
    //   } else {
    //     console.log('error occured during image uplaod')
    //   }
    // })
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Add a profile picture</Form.Label>
          <Form.Control type="file" name='image' size="sm" onChange={handleChange} />
          <div>
            {imagePreviews.map((previewUrl, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={previewUrl}
                  alt={`Preview ${index}`}
                  style={{ width: '200px', height: '200px', objectFit: 'cover', marginTop: '10px' , borderRadius:"100px" }}
                />
                <button
                className='btn btn-danger btn-sm'
                  style={{ position: 'absolute', top: '5px', borderRadius:"45px", }}
                  onClick={removeDp}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button className='btn btn-info' onClick={uploadDP} >Save</button>
        </Form.Group>
      </div>


    </>
  )
}

export default UploadDP