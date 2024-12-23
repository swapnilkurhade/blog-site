import mongoose from 'mongoose';
import Cart from '../models/cart.js'


export const addCart = async (req, res) => {
    const { userId, items } = req.body;

    try {

        const existingCard = await Cart.findOne({ 'userId': userId })

        if (existingCard) {

            for (const newItem of items) {
                const existingItem = existingCard.items.find((item) => {
                    return item.productId.toString() == newItem.productId;
                })

                if (existingItem) {

                    await Cart.updateOne(
                        {
                            userId, 'items.productId': newItem.productId
                        },
                        {
                            $inc: {
                                "items.$.quantity": newItem.quantity || 1
                            }
                        }
                    )
                } else {
                    await Cart.updateOne(
                        { userId },
                        {
                            $push: {
                                items: newItem
                            }
                        }
                    )
                }
            }

        } else {
            const newCart = new Cart({ userId, items });
            await newCart.save()
        }

        res.status(201).json({ success: true, message: "Cart updated successfully" })

    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: 'Failed to add to card', error })
    }

}

export const getCartByUser = async (req, res) => {
    try {

        const cart = await Cart.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.params.id),
                }
            },
            {
                $unwind: "$items"
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: '$productDetails'
            },
            {
                $group: {
                    _id: '$_id',
                    userId: { $first: "$userId" },
                    items: {
                        $push: {
                            product: "$productDetails",
                            quantity: "$items.quantity"
                        }
                    },
                    createdAt: { $first: "$createdAt" }
                }
            },
            {
                $limit: 1
            }
        ]);

        res.status(200).json(cart)
    } catch (error) {
        console.log('error', error);
    }
}

export const removeProductByUser = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const rmCart = await Cart.updateOne(
            { userId: new mongoose.Types.ObjectId(userId)  },
            {
                $pull : {
                    items : {
                        productId : new mongoose.Types.ObjectId(productId)
                    }
                }
            }
        )

        if(rmCart.modifiedCount > 0){
            res.status(200).json({ success: true, message : 'product removed from cart...'})
        }else{
            res.status(404).json({ success: false, message : 'product not found...'})
        }

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ success: false, message: 'Failed to remove from cart...' })
    }

}