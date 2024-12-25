import mongoose from "mongoose";

const productSchema =  mongoose.Schema({
    name: { required:true, type: String},
    description: { required:true, type: String},
    type: { required:true, type: String},
    price: { required:true, type: String},
    img: { required:false, type: String}
})

export default mongoose.model('Product', productSchema)