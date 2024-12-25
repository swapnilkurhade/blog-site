import express from "express";
import { createProduct, getAllProducts, getProductByType, removeProduct } from "../controller/products.js";

const router = express.Router();

router.get('/', getAllProducts)
router.post('/add', createProduct)
router.get('/:type', getProductByType)
router.delete('/:id', removeProduct)


export default router;