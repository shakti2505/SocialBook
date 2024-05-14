import express from "express";
import { authorization } from "../../middleware/AuthMiddleware.js";
import chatModal from "../../models/chat/chatModal.js";
import messageModal from "../../models/chat/messageModal.js";
const router = express.Router();

// create message

router.post("/createmessages", authorization, async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModal({
    chatId,
    senderId,
    text,
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
    const messages = await messageModal.find({ chatid });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default router;
