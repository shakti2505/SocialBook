import mongoose from "mongoose";
import userModel from "./user.js";

const displayPictureSchema = new mongoose.Schema({
    displayPictureUrl: {
        type:String
      },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref:userModel,
        required:true
    }
});

const displayPictureModel = mongoose.model('display_picture', displayPictureSchema)
export default displayPictureModel;