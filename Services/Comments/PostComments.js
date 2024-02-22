import express from "express";
import dotenv from 'dotenv'
import multer from 'multer';
import postModel from "../../models/Post.js";
import userModel from "../../models/user.js";
import PostCommentsModal from "../../models/PostComments.js";
import { authorization } from "../../middleware/AuthMiddleware.js";
import UserFriendList from "../../models/FriendList.js";



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
});

router.get('/get_comments', authorization, async (req, res)=>{
    const UserId = req.userId;
    const postComments  = await PostCommentsModal.find({users:UserId});
    const LoggedInUserfriends = await UserFriendList.find({ user: UserId });

    if(postComments.length==0){
        return res.status(401).send("No comments found made by Logged in");
    }
    try {
        let FriendsPostComments  = []
        for (const item of LoggedInUserfriends) {
            const postsComments = await PostCommentsModal.find({ users: item.friend_ID });
            FriendsPostComments = FriendsPostComments.concat(postsComments);
          }
          // Concatenate userPosts and friendsPosts
          const allComments = postComments.concat(FriendsPostComments).sort((a, b)=>{return a.createdAt-b.createdAt}); 
        return res.status(200).json({allComments:allComments});

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server");
    }
});



export default router;