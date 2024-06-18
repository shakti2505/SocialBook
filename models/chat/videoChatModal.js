import mongoose from "mongoose";

const callRecordSchema = new mongoose.Schema({
  callStartTime: String,
  callEndTime: String,
  callStartDate:String,
  callEndDate:String,
  callDuration: String,

},
{
  timestamps: true,
}
);
const videoChatSchema = new mongoose.Schema(
  {
    senderId: String,
    senderDp: String,
    receiverId: String,
    receiverDp: String,
    senderName: String,
    receiverName: String,
    callRecords: [callRecordSchema],
  },
  {
    timestamps: true,
  }
);

const videoChatModal = mongoose.model("Video chat", videoChatSchema);
export default videoChatModal;
