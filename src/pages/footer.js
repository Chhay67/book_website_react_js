import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/footer.css';
function Footer() {
  return (
    <Container fluid className='footer-content bg-dark '>
        <Container className='f-menu'>
            <h1>BOOK WebSite</h1>
            <p >@copy right 2023</p>
        </Container>
    </Container>
  )
}

export default Footer;