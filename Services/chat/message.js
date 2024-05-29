import express, { response } from "express";
import { authorization } from "../../middleware/AuthMiddleware.js";
import chatModal from "../../models/chat/chatModal.js";
import messageModal from "../../models/chat/messageModal.js";
const router = express.Router();

// create message

router.post("/createmessages", authorization, async (req, res) => {
  const {
    chatId,
    senderId,
    text,
    senderDp,
    receiverId,
    receiverDp,
    senderName,
    receiverName,
  } = req.body;
  if (!chatId || !senderId || !text) {
    return res.status(400).json("all fields are required ");
  }
  const message = new messageModal({
    chatId,
    senderId,
    senderDp,
    receiverId,
    text,
    receiverDp,
    senderName,
    receiverName,
  });
  try {
    const response = await message.save();
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//get message
router.get("/getmessage/:chatid", authorization, async (req, res) => {
  const { chatid } = req.params;
  try {
    const messages = await messageModal.find({ chatId: chatid });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//get all message
router.get("/getallmessages", authorization, async (req, res) => {
  try {
    const messages = await messageModal.find({});
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/getlastmessage", authorization, async (req, res) => {
  try {
    const chatDetails = await messageModal.aggregate([
      //sorting the messages by timestamp in decending order
      {
        $sort: { createdAt: -1 },
      },
      // Step 2: Group by receiverId and keep the first message (latest one)
      {
        $group: {
          _id: "$receiverId",
          lastMessage: { $first: "$$ROOT" },
        },
      },
      // Step 3: Project the desired fields
      {
        $project: {
          _id: 0,
          chatId: "$lastMessage.chatId",
          senderId: "$lastMessage.senderId",
          receiverId: "$lastMessage.receiverId",
          senderDp: "$lastMessage.senderDp",
          text: "$lastMessage.text",
          createdAt: "$lastMessage.createdAt",
          updatedAt: "$lastMessage.updatedAt",
        },
      },
    ]);

    return res.status(200).json(chatDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
});

export default router;
