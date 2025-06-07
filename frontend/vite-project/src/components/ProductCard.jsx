
import React from 'react';
import { Card } from 'react-bootstrap';
import {FaEdit,FaTrash} from "react-icons/fa";

const ProductCard = ({ product, onEdit, onDelete }) => {
 return (
  <Card style={{ width: "18rem" }} key={product.id}>
    <Card.Img variant="top" src={product.image} className="product-image" />
    <Card.Body>
      <Card.Title>{product.title} </Card.Title>
      <Card.Text className="product-description flex-grow-1">
        {product.description}</Card.Text>

    <div className="d-flex justify-content-between align-items-center mt-3">
     <span className="fw-bold text-primary"> ${product.price} </span>

     <div className="d-flex gap-3">
      <FaEdit role="button" className="text-success" title="Edit" onClick={onEdit} />
      <FaTrash role="button" className="text-danger" title="Delete" onClick={onDelete} />
    </div>
    </div>
      
    </Card.Body>
  </Card>
);
};

export default ProductCard;