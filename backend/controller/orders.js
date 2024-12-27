import mongoose from "mongoose";
import cart from "../models/cart.js";
import Order from "../models/orders.js"

export const createOrder = async (req, res) => {

    try {
        const body = req.body;
        const newOrder = await new Order(body);
        newOrder.save();

        await cart.findOneAndUpdate({ _id: body.cartId }, { isCompleted: true })

        res.status(201).json({ success: true, body: newOrder })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

export const getOrderByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userOrders = await Order.find({ userId });
        res.status(200).json({ success: true, data: userOrders })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

export const getAllOrders = async (req, res) => {
    try {

        let pipeline = [];
        if(req.params.userId){
            pipeline.push({
                $match: {
                    userId: new mongoose.Types.ObjectId(req.params.userId)
                }
            })
        }
        
        pipeline.push(
            {
                $lookup: {
                    from: 'carts',
                    localField: 'cartId',
                    foreignField: '_id',
                    as: 'cartDetails'
                }
            },
            {
                $unwind : '$cartDetails'
            },
            {
                $lookup : {
                    from : 'users',
                    localField : 'userId',
                    foreignField : '_id',
                    as : 'userDetails'
                }
            },
            {
                $unwind : '$userDetails'
            }
        )
        const userOrders = await Order.aggregate(pipeline)
        res.status(200).json({ success: true, data: userOrders })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ success: false, message: error })
    }
}
