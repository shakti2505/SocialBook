import mongoose from "mongoose";
import userModel from "../models/user.js";

const FriendList = new mongoose.Schema({
    friend_ID: {
        type: String,
        required: true

    },
    friendName:{
        type:String,
        required:true
    },
    friend_dp:{
        type:String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    }
},
    {
        timestamps: true
    });

const UserFriendList = mongoose.model('Frient List', FriendList)
export default UserFriendList;