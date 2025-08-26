import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'
import {products} from '../products.js'

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req,res) => {
    try{
        const dbProducts = await Product.find({});
        // If DB returns items, use them
        if (dbProducts && dbProducts.length > 0) {
            return res.send(dbProducts);
        }
        // If DB connected but empty, fallthrough to in-memory products
    }catch(err){
        // If any DB error (connection down), fallback to in-memory products
        console.error('Product list DB error, returning fallback products:', err.message)
    }

    // Return in-memory products with generated _id so frontend links work
    const fallback = products.map((p, idx) => ({ ...p, _id: String(idx + 1) }));
    res.send(fallback);
}));

productRouter.get('/seed', expressAsyncHandler(async(req,res) => {
    const createdProducts = await Product.insertMany(products);
    res.send( {createdProducts} );
}))


productRouter.get('/:id', expressAsyncHandler(async(req,res) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(product){
            return res.send(product);
        }
        // if not found in DB, fall through to fallback
    }catch(err){
        // DB error — will try fallback below
        console.error('Product details DB error:', err.message)
    }

    // Fallback: look up in in-memory products (we generated ids as '1','2',...)
    const fallback = products.map((p, idx) => ({ ...p, _id: String(idx + 1) }));
    const prod = fallback.find((p) => p._id === id);
    if(prod){
        return res.send(prod);
    }
    res.status(404).send({message: "Product not found."});
}))


export default productRouter;