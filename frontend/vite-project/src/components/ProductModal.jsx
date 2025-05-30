import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ProductModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Enter product name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Banner</Form.Label>
            <Form.Control type="text" placeholder="Enter banner URL" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter  description" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter price" />
          </Form.Group>

        
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;