import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top" style={{
      borderRadius: '0 0 20px 20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '0 20px',
      zIndex: '1000'
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" style={{ fontSize: '18px', margin: '0 10px', padding: '10px 15px', borderRadius: '5px', transition: 'background-color 0.3s' }} activeStyle={{ backgroundColor: '#0056b3' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/signin" style={{ fontSize: '18px', margin: '0 10px', padding: '10px 15px', borderRadius: '5px', transition: 'background-color 0.3s' }} activeStyle={{ backgroundColor: '#0056b3' }}>Sign In</Nav.Link>
            <Nav.Link as={Link} to="/signup" style={{ fontSize: '18px', margin: '0 10px', padding: '10px 15px', borderRadius: '5px', transition: 'background-color 0.3s' }} activeStyle={{ backgroundColor: '#0056b3' }}>Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/chat" style={{ fontSize: '18px', margin: '0 10px', padding: '10px 15px', borderRadius: '5px', transition: 'background-color 0.3s' }} activeStyle={{ backgroundColor: '#0056b3' }}>Chat</Nav.Link>
            <Nav.Link as={Link} to="/ecommerce" style={{ fontSize: '18px', margin: '0 10px', padding: '10px 15px', borderRadius: '5px', transition: 'background-color 0.3s' }} activeStyle={{ backgroundColor: '#0056b3' }}>E-commerce</Nav.Link>
            <Nav.Link as={Link} to="/social" style={{ fontSize: '18px', margin: '0 10px', padding: '10px 15px', borderRadius: '5px', transition: 'background-color 0.3s' }} activeStyle={{ backgroundColor: '#0056b3' }}>Social Media</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
