import mongoose from "mongoose";
import userModel from "../models/user.js";

const FriendList = new mongoose.Schema({
    friendsList: {
        type: [],
        required: true

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