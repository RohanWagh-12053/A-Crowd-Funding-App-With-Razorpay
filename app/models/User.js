import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
    },
    coverPic: {
        type: String,
    },
    razorpayId:{
        type: String,
    },
    razorpaySecret:{
        type: String,
    }
   
    },{timestamps:true});

    export default mongoose.models.User || mongoose.model("User", userSchema);