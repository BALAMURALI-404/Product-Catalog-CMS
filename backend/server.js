import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post('/api/products', async (req,res) => {
    const product=req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: 'Please fill all the fields'});
    }

    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }catch(error){
        console.error("Error in creating product:", error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }

})

app.delete("/api/products/:id", async (req, res) =>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    }catch(error){

    }
})

app.listen(5000, () => {
    connectDB();
    console.log('server started at http://localhost:5000');
})


//9xHH3uIduRE87Rhi
//33.45