import React, { useEffect } from 'react'
import { Link,  useNavigate } from 'react-router-dom'


const Protected = (props) => {
const {Component} = props;
const  navigate = useNavigate()
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('User'));
        if(!user){
            navigate('/login');
        }
    }, [])

  return (
        <Component/>
  )
}

export default Protected;