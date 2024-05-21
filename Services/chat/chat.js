import express from "express";
import { authorization } from "../../middleware/AuthMiddleware.js";
import FriendList from "../../models/FriendList.js";
import chatModal from "../../models/chat/chatModal.js";
const router = express.Router();

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
export default router;
