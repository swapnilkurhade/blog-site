import express from "express";
import { createOrder, getAllOrders, getOrderByUser } from "../controller/orders.js";

const route = express.Router();

route.get('/', getAllOrders)
route.get('/:userId', getAllOrders)
route.post('/create', createOrder)

export default route;