import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/product.route.js";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";

dotenv.config()

const app = express();
const PORT = 5400;  

app.use(cors());

app.use(express.json());

// Test database connection route
app.get("/api/test-db", async (req, res) => {
    try {
        const state = mongoose.connection.readyState;
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };
        res.json({
            status: 'success',
            message: `Database is ${states[state]}`,
            state: state
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Routes
app.use('/api/products', productsRoutes)
app.use('/api/auth',authRoutes)

app.get("/", (req, res) => {
    res.send("Welcome , server is live");
});

// Connect to database first, then start the server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log('Server is running on http://localhost:5400');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); 

        
    }
};

startServer();