import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import postModel from "../../models/Post.js";
import userModel from "../../models/user.js";
import PostCommentsModal from "../../models/PostComments.js";
import { authorization } from "../../middleware/AuthMiddleware.js";
import UserFriendList from "../../models/FriendList.js";

const router = express.Router();

//create Comments on Post

router.post("/create_comment", authorization, async (req, res) => {
  try {
    const UserId = req.userId;
    const { LoggedInUserName, LoggedInUserDp, postID, comment } = req.body;

    if (!postID || !LoggedInUserName || !comment) {
      return res.status(401).send({ message: "All fields are required" });
    }
    const post = await postModel.findById(postID);

    const newComment = new PostCommentsModal({
      postID: postID,
      comment: comment,
      users: UserId,
      userDP: LoggedInUserDp,
      userName: LoggedInUserName,
    });

    const savedComment = await newComment.save();
    const  totalComments = post.totalComments;
    let commentsCount = totalComments + 1; 
    await postModel.findByIdAndUpdate(postID, {totalComments:commentsCount});
    return res
      .status(201)
      .json({ message: "Commented Successfully", savedComment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error", error });
  }
});

router.get("/get_comments", authorization, async (req, res) => {
  try {
    const UserId = req.userId;
    const { postID } = req.query;
    const postCommentsID = await PostCommentsModal.find( postID ? { postID: postID } :{});
    console.log(postCommentsID.length)
    return res.status(200).json({ allComments: postCommentsID });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
