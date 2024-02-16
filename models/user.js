import { timeStamp } from "console";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    middlename: {
        type: String,
    },
    LastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
        trim: true
    },
    DateOfBirth: {
        type: String,
        required: true,
        trim: true
    },
    profilePic:{
        type:String
    },
    livesIn:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    highSchool:{
        type:String
    },
    college:{
        type:String
    },
    relationShipStatus:{
        type:String
    },
    hobbies:{
        type:[]
    },
    likes:{
        type:[]
    },
    dislikes:{
        type:[]
    },
    bio:{
        type:String
    },
    subscription:{
        type:Boolean,
        default:false
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
},
{
    timestamps: true
}
   );

const userModel = mongoose.model('User', UserSchema)
export default userModel;