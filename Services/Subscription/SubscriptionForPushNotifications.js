import express from "express";
import { authorization } from "../../middleware/AuthMiddleware.js";
import SubscriptionModel from "../../models/SubscriptionSchema.js";
const router = express.Router()

router.post('/subscribe-for-push-notification', authorization, async (req, res) => {
    try {
        const { subscription } = req.body
        console.log(subscription)
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
        return res.status(200).send({ messgae: "Subscribed for Push Notification", sub: newSubscription });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ messgae: "Internal Server Error", error });
    }
})

export default router;
