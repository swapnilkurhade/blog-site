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
        const cart = await Cart.find({ userId: req.params.id })
        console.log(cart);
        
        res.status(200).json(cart)
    } catch (error) {
        console.log('error', error);
    }
}