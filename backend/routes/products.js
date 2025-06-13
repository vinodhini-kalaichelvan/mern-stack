import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json({ success: true, message: 'Products fetched successfully', products });
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product Id' });
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product fetched successfully', product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const { title, image, description, price } = req.body;
    const product = new Product({ title, image, description, price });
    await product.save();
    res.status(201).json({ success: true, message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product Id' });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;