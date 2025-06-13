import express from 'express';
import Product from '../models/Product.js';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller.js';
const router = express.Router();
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;