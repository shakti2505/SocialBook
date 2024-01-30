import mongoose from "mongoose";
import userModel from "./user.js";

const PostSchema = new mongoose.Schema({
    postCaption: {
        type: String,
    },
    postImagesURls: {
        type: []    
    }
    ,
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    }
},{ timestamps: true });

const postModel = mongoose.model('post', PostSchema);
export default postModel;
