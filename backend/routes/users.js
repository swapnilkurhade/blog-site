import express from "express";
import { createUser, deleteUser, getAllUsers } from "../controller/users.js";

const router = express.Router();

router.get('/', getAllUsers)
router.post('/signin', createUser)
router.delete('/:id', deleteUser)



export default router;