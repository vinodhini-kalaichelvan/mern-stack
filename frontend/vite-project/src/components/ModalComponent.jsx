import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ 
  show, 
  onClose, 
  onSubmit, 
  title, 
  submitLabel = "Save",
  children 
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {children}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {submitLabel}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalComponent;