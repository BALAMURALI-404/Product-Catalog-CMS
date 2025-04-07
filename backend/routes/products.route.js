import e from 'express';
import express from 'express';

const router = express.Router();

router.get('/', async (req,res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }catch(error){
        console.error("Error in fetching products:", error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
});

router.post('/', async (req,res) => {
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

});

router.put('/:id', async (req,res) =>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({successs: false, message: 'Invalid product ID'});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    }catch(error){
        console.error("Error in updating product:", error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
});

router.delete("/:id", async (req, res) =>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    }catch(error){
        console.error("Error in deleting product:", error.message);
        res.status(404).json({success: false, message: 'Product not found'});
    }
});

export default router;