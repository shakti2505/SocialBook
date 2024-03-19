import friendRequestModal from "../models/FrientRequest.js";
import SubscriptionModel from "../models/SubscriptionSchema.js";
import userModel from "../models/user.js";
import webpush from 'web-push'
import options from "../middleware/PushNotification.js";
import FriendRequestNotificationsModal from "../models/Notifications/FriendRequestNotificaitons.js";
import PostNotificationModal from "../models/Notifications/PostNotification.js";


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
    changeStreams.on('change', async (next) => {
        const { fullDocument } = next
        if (fullDocument) {
            const requestReceiver = await userModel.findById(fullDocument.requestReceiverID);
            const subscription = await SubscriptionModel.find({ user: fullDocument.requestReceiverID });
            if (next.operationType === 'insert' && requestReceiver !== undefined) {
                const newFriendRqstNoti = new FriendRequestNotificationsModal({
                    friendRequestID: fullDocument._id,
                    userID: fullDocument.requestReceiverID,
                    requestSenderName: fullDocument.senderName,
                    requestSenderDP: fullDocument.senderProfilePicture,
                    frientRequestStatus: fullDocument.frientRequestStatus
                });
                await newFriendRqstNoti.save();
            } else {
                console.log('No changes found in the streams')
            }
        }
    });
    return changeStreams;
}

 const monitorPosts = async (collection, message="Chnage streams starts") =>{
    try {
        const changeStreams = collection.watch();
        changeStreams.on('change', async(next)=>{
            const { fullDocument } = next;
    
            if(fullDocument && next.operationType==='insert'){
                const newPostNotification = new PostNotificationModal({
                    postId:fullDocument._id,
                    userID:fullDocument.users,
                    postOwnerDP:fullDocument.postOwnerDP,
                });
                const res = await newPostNotification.save();
            }
            else{
                console.log('No chages found in the Post Streams')
            }
        });
        return changeStreams;

    } catch (error) {
            console.log('error in saving Notfication',error)
    }
    }
    const monitor = {
        monitorRequests: monitorRequests,
        monitorPosts: monitorPosts
    };

export  default monitor;