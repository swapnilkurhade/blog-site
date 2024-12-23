import { addCart, getCartByUser, removeProductByUser } from "../controller/cart.js";
import express from "express";

const router = express.Router();

router.post('/add', addCart)
router.get('/:id',getCartByUser);
router.post('/remove', removeProductByUser)

export default router;