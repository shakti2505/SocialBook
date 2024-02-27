import webpush from "web-push";
import options from "../../middleware/PushNotification.js";
import SubscriptionModel from "../../models/SubscriptionSchema.js";
import FriendRequestNotificationsModal from "../../models/Notifications/FriendRequestNotificaitons.js";
import friendRequestModal from "../../models/FrientRequest.js";
import userModel from "../../models/user.js";
import PostNotificationModal from "../../models/Notifications/PostNotification.js";
import UserFriendList from "../../models/FriendList.js";

const SendFriendRequestNotification = async (UserID) => {
  const Usersubscription = await SubscriptionModel.find({ user: UserID });
  const notificaiton = await FriendRequestNotificationsModal.find({
    userID: UserID,
  });
  if (!Usersubscription || !notificaiton) {
    console.log("Subscription or notification is not found! ");
  }
  try {
    let sub = {
      endpoint: "",
      expirationTime: "",
      keys: {
        p256dh: "",
        auth: "",
      },
    };
    const options = {
      vapidDetails: {
        subject: "mailto:myemail@example.com",
        publicKey: process.env.VAPID_PUBLIC_KEY,
        privateKey: process.env.PrivateKey,
      },
    };
    Usersubscription.map((item) => {
      (sub.endpoint = item.endpoint),
        (sub.expirationTime = item.expirationTime),
        (sub.keys.p256dh = item.keys.p256dh),
        (sub.keys.auth = item.keys.auth);
    });
    const requestSender = await friendRequestModal.findById(
      notificaiton[0].friendRequestID
    );
    const payload = JSON.stringify({
      title: "Socialbook",
      body: {
        Name: `${requestSender.senderName} sent you a friend request`,
      },
      profilePic: requestSender.senderProfilePicture,
    });
    const noti = await webpush.sendNotification(sub, payload, options);
    console.log("noti", noti);
  } catch (error) {
    console.log("error in sending notificatioin to specific user", error);
  }
};

const sendPostUploadNotification = async (UserID) => {
  const Usersubscription = await SubscriptionModel.find({ user: UserID });
  console.log(Usersubscription);
  const notificaiton = await PostNotificationModal.find({ userID: UserID });
  console.log(notificaiton)
  if (!Usersubscription || !notificaiton) {
    console.log("Subscription or notification is not found! ");
  }
  try {
    let sub = {
      endpoint: "",
      expirationTime: "",
      keys: {
        p256dh: "",
        auth: "",
      },
    };
    const options = {
      vapidDetails: {
        subject: "mailto:myemail@example.com",
        publicKey: process.env.VAPID_PUBLIC_KEY,
        privateKey: process.env.PrivateKey,
      },
    };
    Usersubscription.map((item) => {
      (sub.endpoint = item.endpoint),
        (sub.expirationTime = item.expirationTime),
        (sub.keys.p256dh = item.keys.p256dh),
        (sub.keys.auth = item.keys.auth);
    });
    const PostOwner = await userModel.findById( notificaiton[0].userID)
    const payload = JSON.stringify({
        title: "Socialbook",
        body: {
          Name: `${PostOwner.firstName + " " + PostOwner.LastName} uploaded a new Post`,
        },
        profilePic: notificaiton[0].postOwnerDP,
      });
      const noti = await webpush.sendNotification(sub, payload, options);
      console.log("noti", noti);
  } catch (error) {

  }
};

const notificaitonMethods = {
  SendFriendRequestNotification: SendFriendRequestNotification,
  sendPostUploadNotification: sendPostUploadNotification,
};
export default notificaitonMethods;
