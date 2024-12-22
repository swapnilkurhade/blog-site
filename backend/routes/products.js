import express from "express";
import { createProduct, getAllProducts, getProductByType } from "../controller/products.js";

const router = express.Router();

router.get('/', getAllProducts)
router.post('/add', createProduct)
router.get('/:type', getProductByType)


export default router;