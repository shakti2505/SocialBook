import friendRequestModal from "../models/FrientRequest.js";
import SubscriptionModel from "../models/SubscriptionSchema.js";
import userModel from "../models/user.js";
import webpush from 'web-push'
import options from "../middleware/PushNotification.js";
import FriendRequestNotificationsModal from "../models/Notifications/FriendRequestNotificaitons.js";


// const closeChangeStreams = (timeInMS = 60000, changeStreams) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("closing the change streams ")
//             changeStreams.close()
//             resolve()
//         }, timeInMS);
//     });
// }

const monitorRequests = async (collection, message = "Chnage streams starts") => {
    const changeStreams = collection.watch();
    console.log(message);
    changeStreams.on('change', async (next) => {
        const { fullDocument } = next
        if (fullDocument) {
            const requestReceiver = await userModel.findById(fullDocument.requestReceiverID);
            const subscription = await SubscriptionModel.find({ user: fullDocument.requestReceiverID });
            if(next.operationType==='insert' && requestReceiver!==undefined){
                const newFriendRqstNoti = new FriendRequestNotificationsModal({
                        friendRequestID:fullDocument._id,
                        userID:fullDocument.requestReceiverID,
                        requestSenderName:fullDocument.senderName,
                        requestSenderDP:fullDocument.senderProfilePicture,
                        frientRequestStatus:fullDocument.frientRequestStatus
                });
                await newFriendRqstNoti.save();
            }else{
                console.log('No changes found in the streams')
            }
        }
    });
    return changeStreams;
}

export default monitorRequests;