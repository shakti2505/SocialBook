import webpush from 'web-push'
import options from '../../middleware/PushNotification.js'
import SubscriptionModel from '../../models/SubscriptionSchema.js'
import FriendRequestNotificationsModal from '../../models/Notifications/FriendRequestNotificaitons.js'
import friendRequestModal from '../../models/FrientRequest.js'
import userModel from '../../models/user.js'


export const SendFriendRequestNotification = async (UserID) => {
    const Usersubscription = await SubscriptionModel.find({ user: UserID });
    console.log('Usersubscription', Usersubscription)
    const notificaiton = await FriendRequestNotificationsModal.find({ userID: UserID });
    console.log('notificaiton', notificaiton);
    if (!Usersubscription || !notificaiton) {
        console.log("Subscription or notification is not found! ")
    }
    try {
        let sub = {
            endpoint: "",
            expirationTime: "",
            keys: {
                p256dh: "",
                auth: ""
            }
        }
        const options = {
            vapidDetails: {
                subject: 'mailto:myemail@example.com',
                publicKey: process.env.VAPID_PUBLIC_KEY,
                privateKey: process.env.PrivateKey,
            },
        };
        Usersubscription.map((item) => {
            sub.endpoint = item.endpoint,
                sub.expirationTime = item.expirationTime,
                sub.keys.p256dh = item.keys.p256dh,
                sub.keys.auth = item.keys.auth
        });
        const requestSender = await friendRequestModal.findById(notificaiton[0].friendRequestID);
        const payload = JSON.stringify({
            title: "Friend request",
            body: {
                Name: requestSender.senderName,
            },
            profilePic: requestSender.senderProfilePicture
        });
        console.log('payload', payload);
        const noti = await webpush.sendNotification(
            sub,
            payload,
            options
        );
        console.log('user specific noti', noti);
    } catch (error) {
        console.log('error in sending notificatioin to specific user', error)
    }

}   

