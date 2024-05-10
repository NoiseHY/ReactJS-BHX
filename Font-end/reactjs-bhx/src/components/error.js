import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="display-1">404</h1>
          <p className="lead">Oops! Page not found.</p>
          <p className="lead">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
