import mongoose from "mongoose";

const chatSehema = new mongoose.Schema(
  {
    members: Array,
  },
  {
    timestamps: true,
  }
);

const chatModal = mongoose.model("Chat", chatSehema);
export default chatModal;
