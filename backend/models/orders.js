import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    cartId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Cart',
        required : true
    },
    total_price : {
        type : String,
        required : true
    },
    payment_status :{
        type : Boolean,
        required : true,
        default : true
    }
})

export default mongoose.model('Order',orderSchema)