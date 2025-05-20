import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js"

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json())

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port:${port}`);
})

app.get('/', (req, res) => {
    res.status(200).send('Hello from backend');
})

app.post('/products', async (req, res) => {
    const product = req.body;
    console.log({
        product,
    })
    if (!product.name || !product.price || !product.image) {
        return res.status(400).send({
            Error: "Bad Request",
            message: "Please provide all fields"
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).send({
            success: true,
            data: newProduct
        })
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
})

// dEzrXYc5uyotYeMB
// mongodb+srv://kevinaldroniya13:<db_password>@cluster0.3yv2ngs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0