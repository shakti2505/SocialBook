import express from "express";
import { authorization } from "../../middleware/AuthMiddleware.js";
import FriendList from "../../models/FriendList.js";
import chatModal from "../../models/chat/chatModal.js";
import userModel from "../../models/user.js";

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
