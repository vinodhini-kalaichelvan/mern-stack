import React,{useState, userEffect }  from "react";
import Header from '../../components/Header';
import { Container, Row, Col, Button, CardTitle} from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { EmptyComponent } from '../../components/Empty';
import ProductModal from './ProductModal';
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts, updateProduct } from "../../redux/actions/productActions";



const Products = () => {
  const sampleProducts = [];

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const dispatch = useDispatch();

  const { items, loading } = useSelector ((state) => state.product);

  userEffect (() => {
   dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    //setEditItem
    setEditItem(null);
    //setShowModal
    setShowModal(!showModal);
  };

  const handleEdit = (product) => {
    setEditItem(product);
    setShowModal(true);

  }

  const handleDelete = (id)  => {
    //dispatch delete product
    dispatch(deleteProduct(id));
  };

  const handleSubmit = (values) => {
    if(editItem) {
      //dispatch update product action
      dispatch(updateProduct(values));
    }
    else {
      //dispatch add product
      dispatch(addProduct(values));
    }
  };

  return (
    <>
    <section>
      <Header />
      {loading && <div>
        fetching data..
      </div>}

      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
         {/*<AddProduct /> */}

          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-cirlce me-2"></i> Add Product
          </Button>
        </div>

        {items.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <EmptyComponent message = "We're currently out of stock" />
          </div>
        ) : (
          <Row className="g-4">
            {items.map ((product) => (
              <Col key={product.id} xs={12} sm={6} md={3} lg={3}>
                <ProductCard product={product}
                 onEdit={ () => handleEdit(product)}
                 onDelete={() => handleDelete(product.id)}
                 />
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <ProductModal
       show={showModal}
       onClose={() => setShowModal(!showModal)}
       initialValues={editItem || {
        title : "",
        image : "",
        description : "",
        price : 0,
       }
      }
      onSubmit={handleSubmit}
      isEdit={!!editItem}
       />
    </section>
  </>
  );
}

export default Products;