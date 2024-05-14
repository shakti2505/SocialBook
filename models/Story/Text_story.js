import mongoose from "mongoose";
import userModel from "../user.js";

const TextStory = new mongoose.Schema({
  views: [],
  likedBy: [],
  storyOwnerdp: {
    type: String,
  },
  storyOwnerName: {
    type: String,
  },
  storyURL:{
    type:String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  frientRequestStatus: {
    type: String,
    enum: ['public', 'friends', 'custom'],
    default:'friends'
},
  createdAt: {
    type: Date,
    expires: 86400,
    default: Date.now,
  },
});

TextStory.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

const Textstory = mongoose.model("Text story", TextStory);
export default Textstory;
