import express from "express";
import dotenv from 'dotenv'
import multer from 'multer';
import postModel from "../../models/Post.js";
import userModel from "../../models/user.js";
import PostCommentsModal from "../../models/PostComments.js";
import { authorization } from "../../middleware/AuthMiddleware.js";


const router = express.Router();

//create Comments on Post

router.post('/create_comment', authorization, async (req, res) => {

    try {
        const UserId = req.userId;
        const { LoggedInUserName, LoggedInUserDp, postID, comment } = req.body;

        if (!postID || !LoggedInUserName || !comment) {
            return res.status(401).send({ message: "All fields are required" });
        }

        const newComment = new PostCommentsModal({
            postID: postID,
            comment: comment,
            users: UserId,
            userDP: LoggedInUserDp,
            userName: LoggedInUserName,
        });

        const savedComment = await newComment.save();
        return res.status(201).json({ message: "Commented Successfully", savedComment });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error", error })
    }
})

export default router;