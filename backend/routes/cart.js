import { addCart, getCartByUser } from "../controller/cart.js";
import express from "express";

const router = express.Router();

router.post('/add', addCart)
router.get('/:id',getCartByUser);

export default router;