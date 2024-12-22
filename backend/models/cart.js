import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items : [
        {
            productId : {
                type: mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity : {
                type: Number,
                required : true
            }
        }
    ],
    createdAt : {
        type: Date,
        default : Date.now()
    }

})

export default mongoose.model('Cart', cartSchema)