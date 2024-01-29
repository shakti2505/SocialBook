import express, { response } from "express";
import dotenv from 'dotenv'
import multer from 'multer';
import { authorization } from '../middleware/AuthMiddleware.js';
import userModel from "../models/user.js";
import friendRequestModal from "../models/FrientRequest.js";
import UserFriendList from "../models/FriendList.js";
import displayPictureModel from "../models/displayPictures.js";

const router = express.Router()

// create friend request
router.post('/receieve_friend_requests',authorization, async (req, res) => {
    const UserId = req.userId;
    const { friendRequestStatus, requestReceiverId } = req.body;
    console.log(friendRequestStatus, requestReceiverId, UserId)
    try {
        if (!friendRequestStatus || !requestReceiverId) {
            res.status(404).json({ messsgae: "No request found!" })
        }
        const requestSender = await userModel.findById(UserId);
        const requestreceiver = await userModel.findById(requestReceiverId);
      

        if (requestSender && requestreceiver && friendRequestStatus) {
            const newFriendRequest = new friendRequestModal({
                frientRequestsenderID: UserId,
                frientRequestStatus: friendRequestStatus,
                requestReceiverID: requestReceiverId,

            });
            const savedNewfriendrequest = await newFriendRequest.save();
            res.status(201).send({ message: "Friend request send", sentrequest: savedNewfriendrequest })

        } else {
            res.status(404).send({ message: "No sender found" })
        }

    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});

//received pending friend request
router.get('/get_received_friendRequests', async (req, res) => {
    try {
        // const UserId = req.userId;
        const {UserId}  = req.body
        const loggedInUser = await userModel.findById(UserId);
        const pending_friend_request = await friendRequestModal.find({ requestReceiverID: UserId });
        let pendingFriendRequest = []
        let requestiee_url=''
        if (loggedInUser && pending_friend_request) {
            await Promise.all(pending_friend_request.map(async (item) => {
                let requestiee = await userModel.findById(item.frientRequestsenderID);
                let requestieePicture = await displayPictureModel.find({users:item.frientRequestsenderID})
                requestieePicture.map((item1)=>{
                    requestiee_url = item1.displayPictureUrl ? item1.displayPictureUrl :""
                })
                pendingFriendRequest.push({
                    firstname: requestiee.firstName,
                    lastname: requestiee.LastName,
                    requestiee_id: requestiee._id,
                    friend_request_id: item._id,
                    displayPicture:requestiee_url
                });
            }));
+
            res.status(200).send(pendingFriendRequest);
        }
        else {
            res.status(404).send('no pending request found')
        }
    } catch (error) {
        res.status(500).send({ error })
    }
});

//action of frient request

router.post('/accept_reject_friend_request', authorization,async (req, res) => {
    try {
        let status = ['pending', 'rejected', 'accepted']
        const UserId = req.userId;      
        const { frientRequestID, frientRequestStatus } = req.body
        const loggedInUser = await userModel.findById(UserId);
        const pending_friend_request = await friendRequestModal.findById(frientRequestID);
        if (!pending_friend_request || !loggedInUser || !status.includes(frientRequestStatus)) {
            res.status(404).send({ message: "Please send all fields" });
        }
        if (frientRequestStatus === 'accepted' && pending_friend_request.frientRequestStatus === 'pending') {
            const acceptedFriendRequest = await friendRequestModal.findByIdAndUpdate(frientRequestID,
                { $set: { frientRequestStatus: frientRequestStatus } });
            //adding sender in the frientlist of receiver's
            const newlyAddedFriendDoc = new UserFriendList({
                user: pending_friend_request.requestReceiverID,
                friendsList: pending_friend_request.frientRequestsenderID
            })
            const newlyAddedfriend = await newlyAddedFriendDoc.save();
            res.status(200).send({ newlyAddedfriend, acceptedFriendRequest });
        }
        else {
            res.send({ message: "request already accepted" });
        }


    } catch (error) {
        res.status(500).send({ error });

    }

});

// show all Users

router.get('/all_users',  async(req, res)=>{
    const UserId = req.userId;
    const loggedInUser = await userModel.findById(UserId);
    const Users = []
    if(loggedInUser){
        const all_users = await userModel.find({});
        const display_pictures = await displayPictureModel.findOne({});
        await Promise.all(all_users.map(async(item)=>{


        }))

    }

    res.status(200).send({result})

})



export default router;