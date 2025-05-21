import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ProductRoute from "./routes/product.route.js";

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

app.use('/api/products', ProductRoute);