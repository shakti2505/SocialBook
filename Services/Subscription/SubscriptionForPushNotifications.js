import express from "express";
import { authorization } from "../../middleware/AuthMiddleware.js";
import SubscriptionModel from "../../models/SubscriptionSchema.js";
import userModel from "../../models/user.js";
const router = express.Router()

router.post('/subscribe-for-push-notification', authorization, async (req, res) => {
    try {
        const { subscription } = req.body
        console.log("subscription",subscription);
        const UserId = req.userId;
        if (!subscription.endpoint || !subscription.keys) {
            return res.status(401).json({ messgae: 'All fields are mandatory' });
        }
        const newSubscription = new SubscriptionModel({
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime,
            keys: subscription.keys,
            user: UserId,
        });
        await newSubscription.save();
        await userModel.updateOne({_id:UserId}, {subscription:true});
        return res.status(200).send({ messgae: "Subscribed for Push Notification", sub: newSubscription });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ messgae: "Internal Server Error", error });
    }
});

// router.post("/mark_notification_read", authorization, (req, res)=>{
//     try {
//         logg
//     } catch (error) {
        
//     }
// });



export default router;
