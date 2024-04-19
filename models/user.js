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
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    pronoun: {
        type: String,
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
    otp:{
        type:Number,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    accountType:{
        type: String,
        enum: ['private', 'public' ],
        default:'private',
    }
},
{
    timestamps: true
}
   );

const userModel = mongoose.model('User', UserSchema)
export default userModel;