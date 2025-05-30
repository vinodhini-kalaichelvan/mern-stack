import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="home-hero text-white d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 fw-bold">Welcome to ProdManage</h1>
            <p className="lead">
              Effortlessly manage your products with our all-in-one tool.
              Create, view, edit, and delete products — fast, simple, and
              reliable.
            </p>
            <Link to="/products">
              <Button variant="light" size="lg" className="mt-3">
                Explore Products
              </Button>
            </Link>
          </Col>
          <Col md={6}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/1533/1533926.png"
                alt="Product illustration"
                className="img-fluid mt-4 mt-md-0"
            />
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;