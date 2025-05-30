import React from 'react';
import Header from '../../components/Header';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AddProduct from './AddProducts';

const ProductCard = ({ product }) => (
  <Card>
    <Card.Img variant="top" src={product.banner} style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>{product.description}</Card.Text>
      <Card.Text className="fw-bold">${product.price}</Card.Text>
    </Card.Body>
  </Card>
);

const Products = () => {
  const sampleProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Noise cancelling over-ear headphones",
      banner:
        "https://res.cloudinary.com/da3w329cx/image/upload/v1683056487/samples/landscapes/nature-mountains.jpg",
      price: 120,
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Smart wearable with health tracking",
      banner:
        "https://res.cloudinary.com/da3w329cx/image/upload/v1683056500/cld-sample-5.jpg",
      price: 80,
    },
    {
      id: 3,
      name: "Laptop",
      description: "14-inch Full HD display, 256GB SSD",
      banner:
        "https://res.cloudinary.com/da3w329cx/image/upload/v1683056499/cld-sample-3.jpg",
      price: 600,
    },
  ];

  return (
    <section>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          <AddProduct />
        </div>

        {sampleProducts.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <p>We're currently out of stock</p>
          </div>
        ) : (
          <Row className="g-4">
            {sampleProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={3} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default Products;