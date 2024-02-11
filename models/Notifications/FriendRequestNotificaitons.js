import mongoose from "mongoose";
import userModel from "../user.js";
import friendRequestModal from "../FrientRequest.js";

const FriendRequestNotifications = new mongoose.Schema({
   friendRequestID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:friendRequestModal,
    required: true
   },
   userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:userModel,
    required: true
   },
   requestSenderName:{
      type:String,
      required:true
   },
   requestSenderDP:{
      type:String
   },
   frientRequestStatus: {
      type: String,
      enum: ['pending', 'rejected', 'accepted'],
      required: true
  },

}, { timestamps: true });

const FriendRequestNotificationsModal = mongoose.model('FriendRequestNotifications', FriendRequestNotifications);
export default FriendRequestNotificationsModal;