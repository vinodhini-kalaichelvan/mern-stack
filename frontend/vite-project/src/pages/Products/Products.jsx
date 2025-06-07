import React, { useState, useEffect } from "react";
import Header from '../../components/Header';
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { EmptyComponent } from '../../components/Empty';
import ProductModal from './ProductModal';
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts, updateProduct } from "../../redux/actions/productActions";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setEditItem(null);
    setShowModal(!showModal);
  };

  const handleEdit = (product) => {
    setEditItem(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // For now, we'll just log the delete action since it's not implemented yet
    console.log('Delete product:', id);
  };

  const handleSubmit = (values) => {
    if (editItem) {
      // If we're editing, update the product
      dispatch(updateProduct({ ...values, id: editItem.id }));
    } else {
      // If we're adding, create a new product
      dispatch(addProduct({ ...values, id: Date.now() })); // Using timestamp as temporary ID
    }
    setShowModal(false);
  };

  return (
    <>
      <section>
        <Header />
        <Container className="mt-4">
          <div className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={handleAdd}>
              <i className="bi bi-plus-circle me-2"></i> Add Product
            </Button>
          </div>

          {products.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <EmptyComponent message="We're currently out of stock" />
            </div>
          ) : (
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={3} lg={3}>
                  <ProductCard
                    product={product}
                    onEdit={() => handleEdit(product)}
                    onDelete={() => handleDelete(product.id)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Container>
        <ProductModal
          show={showModal}
          onClose={() => setShowModal(false)}
          initialValues={editItem || {
            title: "",
            image: "",
            description: "",
            price: 0,
          }}
          onSubmit={handleSubmit}
          isEdit={!!editItem}
        />
      </section>
    </>
  );
};

export default Products;