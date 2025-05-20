import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const port = 3000;

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port:${port}`);
})

app.get('/', (req, res) => {
    res.status(200).send('Hello from backend');
})

// dEzrXYc5uyotYeMB
// mongodb+srv://kevinaldroniya13:<db_password>@cluster0.3yv2ngs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0