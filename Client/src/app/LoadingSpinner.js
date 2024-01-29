import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = (props) => {
  return (
    <div  className={props.disable ? 'loader spinner-border text-primary': 'd-none'} style={{width:"3rem", height:"3rem"}} role="status" >
    <span className="visually-hidden">Loading...</span>
  </div>
  )
}

export default LoadingSpinner