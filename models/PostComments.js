import mongoose from "mongoose";
import userModel from "./user.js";


const PostComments =  new mongoose.Schema({
    comment:{
        type:String,
        required: true
    },
    postID:{
        type:String,
        required: true
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    userDP:{
        type:String,
    },
    userName:{
        type:String,
        required: true
    }
}, { timestamps: true }
);

const PostCommentsModal = mongoose.model('PostComments', PostComments);
export default PostCommentsModal