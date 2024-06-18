import express, { response } from "express";
import { authorization } from "../../middleware/AuthMiddleware.js";
import FriendList from "../../models/FriendList.js";
import chatModal from "../../models/chat/chatModal.js";
import userModel from "../../models/user.js";
import videoChatModal from "../../models/chat/videoChatModal.js";
import { getMiliseconds } from "../utilities/utils.js";

const router = express.Router();

//create video chat
router.post("/createvideochat", authorization, async (req, res) => {
  const {
    senderId,
    senderDp,
    receiverId,
    receiverDp,
    senderName,
    receiverName,
    callStartTime,
  } = req.body;

  try {
    const existingChat = await videoChatModal.findOne({
      receiverId: receiverId,
      senderId: senderId,
    });
    if (existingChat) {
      const newCallRecord = {
        callStartDate: callStartTime.date,
        callStartTime: callStartTime.time,
        callEndTime: null,
        callEndDate: null,
        callDuration: null,
      };
      await videoChatModal.findByIdAndUpdate(existingChat._id, {
        $push: { callRecords: newCallRecord },
        new: true,
        useFindAndModify: false,
        upsert: true,
        returnNewDocument: true,
      });
      const updatedDoc = await videoChatModal.findById(existingChat._id);
      return res.status(200).json(updatedDoc);
    }
    //cheking if both members are friends
    const areFriends = await FriendList.find({
      friend_ID: receiverId,
      user: senderId,
    });
    if (areFriends.length !== 0) {
      const newVideoChat = new videoChatModal({
        senderId,
        senderDp,
        receiverId,
        receiverDp,
        senderName,
        receiverName,
        callRecords: {
          callStartDate: callStartTime.date,
          callStartTime: callStartTime.time,
          callEndTime: "",
          callDuration: "",
        },
      });
      const response = await newVideoChat.save();
      return res.status(201).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
});

// get video chat of user
router.get("/getVideoChatRecords", authorization, async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const videoChatRecords = await videoChatModal.find({
      senderId: senderId,
      receiverId: receiverId,
    });
    if(videoChatRecords){
      return res.status(200).json(videoChatRecords);
    }else{
      return res.status(401).send("NO records found!")
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal server error");
  }
});

// record call Start time and date
router.post("/recordVideoStartTime", authorization, async (req, res) => {
  const { receiverId, senderid, callStartTime } = req.body;
  try {
    if (!receiverId || !senderid || !callStartTime) {
      return res.status(401).send("all fields are required");
    }

    const existingVideoChat = await videoChatModal.find({
      senderId: receiverId,
      receiverId: senderid,
    });
    if (existingVideoChat) {
      // Find the call record by ID
      const existingCallRecord =
        existingVideoChat[0].callRecords[
          existingVideoChat[0].callRecords.length - 1
        ];

      if (existingCallRecord) {
        // Update the call start time and end date if they are not already set
        if (!existingCallRecord.callStartTime) {
          existingCallRecord.callStartTime = callStartTime.time;
        }
        if (!existingCallRecord.callStartDate) {
          existingCallRecord.callStartDate = callStartTime.date;
        }
      } else {
        console.error("Call record not found");
      }
    } else {
      console.error("Video chat not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
});

// // record call end time end date
router.post("/recordVideoEndTime", authorization, async (req, res) => {
  const { receiverId, senderid, callEndTime } = req.body;
  console.log(receiverId, senderid, callEndTime);
  try {
    if (!receiverId || !senderid || !callEndTime) {
      return res.status(401).send("All fields are required");
    }

    const existingVideoChat = await videoChatModal.find({
      senderId: senderid,
      receiverId: receiverId,
    });

    if (existingVideoChat.length > 0) {
      const existingCallRecord =
        existingVideoChat[0].callRecords[
          existingVideoChat[0].callRecords.length - 1
        ];
      if (existingCallRecord) {
        // Update the call start time and end date if they are not already set
        if (existingCallRecord.callEndTime == null) {
          if (existingCallRecord.callEndDate == null) {
            existingCallRecord.callEndDate = callEndTime.date;
          }

          // Calculate the call duration
          const startTime = getMiliseconds(existingCallRecord.callStartTime);
          const endTime = getMiliseconds(callEndTime.time);
          const callDuration = (endTime - startTime) / 1000; // Duration in seconds
          console.log(callDuration, "call duration");
          // Update the call duration
          existingCallRecord.callDuration = callDuration;
          existingCallRecord.callEndTime = callEndTime.time; // Set the call end time

          // Update the existing call record in the database
          await existingVideoChat[0].save();
        }
      } else {
        console.error("Call record not found");
      }
    } else {
      console.error("Video chat not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// create chat
router.post("/createchat", authorization, async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    //checking if chat is existed
    const existingChat = await chatModal.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (existingChat) return res.status(200).json(existingChat);
    //cheking if both members are friends
    const areFriends = await FriendList.find({
      friend_ID: secondId,
      user: firstId,
    });

    if (areFriends.length !== 0) {
      const newChat = new chatModal({
        members: [firstId, secondId],
      });
      const response = await newChat.save();
      return res.status(201).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// find user chats
router.get("/finduserchat/:userId", authorization, async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModal.find({
      members: { $in: userId },
    });
    return res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/findchat/:firstId/:secondId", authorization, async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModal.find({
      members: { $all: [firstId, secondId] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/search_potential_chats", authorization, async (req, res) => {
  try {
    const UserId = req.userId;
    const loggedInUser = await userModel.findById(UserId);

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "Friend name is required" });
    }

    // const userFriends = await FriendList.find({ friendName: username });

    const users = await FriendList.find({ user: UserId });
    const matchingUsers = users.filter((user) => {
      return (
        user.friendName.slice(0, username.length).toLowerCase() ===
        username.toLowerCase()
      );
    });
    return res.status(200).json(matchingUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

export default router;
