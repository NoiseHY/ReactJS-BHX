import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <p>&copy; 2024 Your Website</p>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-end align-items-center">
            <a href="https://github.com" className="text-light me-3">
              <FaGithub />
            </a>
            <a href="https://twitter.com" className="text-light me-3">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" className="text-light">
              <FaFacebook />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
