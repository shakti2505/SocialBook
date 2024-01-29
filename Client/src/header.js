import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo/Social Book-logos_black.png'
const Header = () => {
    return (
        <>
           <Navbar className="bg-body-tertiary">
        <Container className='d-flex justify-content-center' >
            <img
              src={logo}
              height="150"
              className="d-inline-block align-top "
              alt="Social Book Logo"
              
            />
        </Container>
      </Navbar>
        </>
    )
}

export default Header;