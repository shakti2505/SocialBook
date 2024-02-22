import mongoose from "mongoose";
import userModel from "../models/user.js";

const FrientRequests = new mongoose.Schema({
    frientRequestsenderID: {
        type: String,
        required: true
    },
      frientRequestStatus: {
        type: String,
        enum: ['pending', 'rejected', 'accepted'],
        required: true
    },
    requestReceiverID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    senderProfilePicture:{
        type:String
    },
    senderName:{
        type:String
    }, 
    receiverName:{
        type:String
    },
    receiverProfilePicture:{
        type:String
    }
    
},
    {
        timestamps: true
    });

const friendRequestModal = mongoose.model('Frient Requests', FrientRequests)

export default friendRequestModal;
