import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    senderDp:String,
    receiverId:String,
    text: String,
    receiverDp:String,
    senderName:String,
    receiverName:String
  },
  {
    timestamps: true,
  }
);

const messageModal = mongoose.model('Message', messageSchema);
export default messageModal;
