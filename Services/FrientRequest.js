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
router.post('/receieve_friend_requests', async (req, res) => {
    // const UserId = req.userId;
    const { friendRequestStatus, requestReceiverId, UserId } = req.body;
    try {
        if (!friendRequestStatus || !requestReceiverId ) {
            res.status(404).json({ messsgae: "No request found!" });
        }
        const requestSender = await userModel.findById(UserId);
        const requestreceiver = await userModel.findById(requestReceiverId);
        const requestAlreadyExisted = await friendRequestModal.find({requestReceiverID:requestReceiverId, frientRequestsenderID:UserId})

        if ((requestSender && requestreceiver && friendRequestStatus) && requestAlreadyExisted.length==0) {
            const newFriendRequest = new friendRequestModal({
                frientRequestsenderID: UserId,
                frientRequestStatus: friendRequestStatus,
                requestReceiverID: requestReceiverId,
                frientRequestSenderName:requestSender.firstName + requestSender.LastName,
                frientRequestSenderDP:requestSender.profilePic

            });
            const savedNewfriendrequest = await newFriendRequest.save();
            res.status(201).send({ message: "Friend request send", sentrequest: savedNewfriendrequest })

        } else {
            res.status(404).send({ message: "No sender found or request already existed" })
        }

    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});

//received pending friend request
router.get('/get_received_friendRequests', authorization, async (req, res) => {
    try {
        const UserId = req.userId;
        console.log(UserId)
        // const { UserId } = req.body
        const loggedInUser = await userModel.findById(UserId);
        const pending_friend_request = await friendRequestModal.find({ requestReceiverID: UserId });
        if (loggedInUser && pending_friend_request) {
            res.status(200).send(pending_friend_request);
        } else {
            res.status(400).send('No Logged in User found')
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
        const { frientRequestID, frientRequestStatus,  friendName, FriendDp } = req.body
        const loggedInUser = await userModel.findById(UserId);
        const pending_friend_request = await friendRequestModal.findById(frientRequestID);
        if (!pending_friend_request || !loggedInUser || !status.includes(frientRequestStatus)) {
            res.status(404).send({ message: "Please send all fields" });
        }
        if (frientRequestStatus === 'accepted' && pending_friend_request.frientRequestStatus === 'pending') {
            // const acceptedFriendRequest = await friendRequestModal.findByIdAndUpdate(frientRequestID,
            //     { $set: { frientRequestStatus: frientRequestStatus } });
            //adding sender in the frientlist of receiver's
            const newlyAddedFriendDoc = new UserFriendList({
                user: pending_friend_request.requestReceiverID,
                friendID: pending_friend_request.frientRequestsenderID,
                friendName:friendName,
                FriendDp:FriendDp
            });
            const newlyAddedfriend = await newlyAddedFriendDoc.save();
            const acceptedFriendRequest = await friendRequestModal.findByIdAndRemove(frientRequestID);
            res.status(200).send({ newlyAddedfriend, acceptedFriendRequest });
        }
        else {
            res.send({ message: "request already accepted" });
        }
    } catch (error) {
        res.status(500).send({ error });

    }

});

// get all Users

router.get('/all_users',  authorization,async (req, res) => {
    const UserId = req.userId
    // const { UserId } = req.body;
    const loggedInUser = await userModel.findById(UserId);
    if (loggedInUser) {
        const all_users = await userModel.find({});
        res.status(200).send(all_users);
    }else{
        res.status(500).send("internal Server Error")
    }
});

export default router;