import products from "../models/products.js";

export const getAllProducts = async(req, res) =>{
    try{    
        const product  = await products.find();
        res.status(200).json(product)
    }catch(error){
        console.log('error', error);
    }
}

export const createProduct = (( req, res )=>{
    try {
        const product = req.body;
        const newProduct = new products(product)
        newProduct.save();    
        res.status(201).json(newProduct)
    } catch (error) {
        console.log('error', error);
    }
})

export const getProductByType = async(req, res) =>{
    try{
        const product = await products.find({ type: req.params.type})
        res.status(200).json(product)
    }catch(error){
        console.log('error', error);
    }
}
