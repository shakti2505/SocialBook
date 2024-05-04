import mongoose from "mongoose";
import userModel from "../user.js";

const TextStory = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    bgColor:{
        type:String
    },
    storyFont:{  
        type:String
    },
    views:[],
    likedBy:[],
    storyOwnerdp:{
        type:String
    },
    storyOwnerName:{
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    createdAt:{
        type:Date,
        expires:86400,
        default:Date.now
    },
});

TextStory.index({createdAt:1}, {expireAfterSeconds:0});

const Textstory = mongoose.model('Text story', TextStory)
export default Textstory;