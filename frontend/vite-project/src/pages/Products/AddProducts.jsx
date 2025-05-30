import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import ProductModal from '../../components/ProductModal';

const AddProduct = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button 
        variant="primary" 
        className="d-flex align-items-center gap-2"
        onClick={handleShow}
      >
        <FaPlus /> Add Product
      </Button>
      <ProductModal show={showModal} handleClose={handleClose} />
    </>
  );
};

export default AddProduct;