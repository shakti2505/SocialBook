import mongoose from "mongoose";
import userModel from "./user.js";
const SubscriptionSchema = new mongoose.Schema({
    endpoint: String,
    expirationTime: Number,
    keys: {
        p256dh: String,
        auth: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    }
}, { timestamps: true })

const SubscriptionModel = mongoose.model('subscription', SubscriptionSchema);
export default SubscriptionModel;
