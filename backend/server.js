import express from "express";
import dotenv from "dotenv";
import cors from "cors";
 
const app = express();
const PORT = 5400;  

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Parse JSON bodies
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    // Clean up the URL by removing any encoding
    req.url = decodeURIComponent(req.url).trim();
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
 
// In-memory products array
let products = [];
let currentId = 1;
 
// CREATE
app.post("/api/products", (req, res) => {
    try {
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        
        // Check if body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Request body is empty",
                received: req.body
            });
        }

        // Validate required fields
        const requiredFields = ['title', 'image', 'price'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`,
                received: req.body
            });
        }

        // Create new product
        const product = {
            id: currentId++,
            title: req.body.title.trim(),
            description: req.body.description ? req.body.description.trim() : "",
            image: req.body.image.trim(),
            price: typeof req.body.price === 'string' ? parseFloat(req.body.price) : req.body.price
        };

        // Validate price is a number
        if (isNaN(product.price)) {
            return res.status(400).json({
                message: "Price must be a valid number",
                received: req.body.price
            });
        }

        products.push(product);
        console.log('Product created successfully:', product);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
});
 
// READ all
app.get("/api/products", (req, res) => {
    res.json(products);
});
  
// READ one
app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
  
// UPDATE
app.put("/api/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
 
// DELETE
app.delete("/api/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
 
// Root route
app.get("/", (req, res) => {
    res.json({
        message: "API is running",
        endpoints: {
            products: {
                create: "POST /api/products",
                readAll: "GET /api/products",
                readOne: "GET /api/products/:id",
                update: "PUT /api/products/:id",
                delete: "DELETE /api/products/:id"
            }
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        requested: req.url
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        message: "Internal server error",
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Ready to accept requests');
});
