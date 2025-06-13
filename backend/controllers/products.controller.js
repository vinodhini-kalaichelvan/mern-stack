import mongoose from "mongoose";
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    const {name, image, description, price, category, stock} = req.body;
    if(!name || !image || !description || !price || !category || !stock) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try {
        const product = new Product({name, image, description, price, category, stock});
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        })
    } catch (error) {
        console.log("Error fetching products", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        })
    } catch (error) {
        console.log("Error fetching product", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    const {title, image, description, price} = req.body;

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product id"
        })
    }
    
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        })
    } catch (error) {
        console.log("Error updating product", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product id"
        })
    }
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log("Error deleting product", error.message);
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
}