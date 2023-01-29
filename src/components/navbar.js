import React from 'react';
import { Button, Container, Form, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
      <Container >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Brand className='brand mx-auto d-lg-none'>Logo</Navbar.Brand>
        <Navbar.Collapse className='pl-1' id="navbarScroll">
          <Nav className='nav-items'>
            <LinkContainer to={'/'}>
              <Nav.Link  className='d-none d-lg-block'>
                Logo
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/'}>
              <Nav.Link >
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/listbooks'}>
                <Nav.Link >
                  Books
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/addbook'}>
              <Nav.Link >
                Add Book
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/aboutus'}>
              <Nav.Link >
                About Us
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Form className="d-flex ms-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;