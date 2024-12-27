import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin : {
        type : Boolean,
        default : false,
        required : true
    }
})

export default mongoose.model('User',userSchema)