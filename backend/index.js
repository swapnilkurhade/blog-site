import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/products.js";
import userRoutes from './routes/users.js'
import cartRoutes from './routes/cart.js'
import orderRoute from './routes/orders.js'

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Database connection
const connectToDB = () =>{
    mongoose.connect('mongodb://127.0.0.1:27017/swapmart').then(()=>{
        console.log("database connected")
    }).catch((e)=>{
        console.log('error occured')
    })
}

connectToDB();

// Routes
app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/cart', cartRoutes)
app.use('/order', orderRoute)



app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})