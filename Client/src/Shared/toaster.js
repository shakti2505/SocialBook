import React from 'react';
import { toast } from 'react-toastify';

const Toaster = ( message, action ) => {
   return (
      toast[action](message, {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
      })
  )
}

export default Toaster
