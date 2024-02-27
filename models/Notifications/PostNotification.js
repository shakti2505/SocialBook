import mongoose from "mongoose";
import userModel from "../user.js";
import friendRequestModal from "../FrientRequest.js";

const PostNotification = new mongoose.Schema({
    postId:{
        type:String
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    isRead:{
        type: Boolean,
        default: false
    }, 
    postOwnerDP:{
        type:String
    },
   
});

const PostNotificationModal = mongoose.model('PostNotifications', PostNotification);
export default PostNotificationModal;
