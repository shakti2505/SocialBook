import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderID: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

const messageModal = mongoose.model('Message', messageSchema);
export default messageModal;
