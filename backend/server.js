import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import productRoutes from './routes/products.route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(5000, () => {
    connectDB();
    console.log('server started at http://localhost:5000');
});


//9xHH3uIduRE87Rhi
//33.45 