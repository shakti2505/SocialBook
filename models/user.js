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
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
  
},
   );

const userModel = mongoose.model('User', UserSchema)
export default userModel;