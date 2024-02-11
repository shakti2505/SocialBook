import express from "express";
import dotenv from 'dotenv'
import multer from 'multer';
import { authorization } from '../middleware/AuthMiddleware.js';
import postModel from "../models/Post.js";
import userModel from "../models/user.js";
import monitorRequests from "../ChangeStreams/ChangeStreams.js";

const storage = multer.memoryStorage();
const uploadPostMedia = multer({ storage: storage, limits: { fileSize: 300 * 300 * 2 } })
const router = express.Router();

//Create Post
const closeChangeStreams = (changeStreams, timeInMS = 60000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("closing the change streams  ")
            changeStreams.close()
            resolve()
        }, timeInMS);
    });
}

router.post('/createPost', authorization, async (req, res) => {
    const UserId = req.userId;
    const { postcaptions, postimagesURLs } = req.body;
    try {
        if (postcaptions == "" && postimagesURLs.length == 0) {
            res.status(404).send({ message: "No post found" });
        }
        //staring Streams on Post modal
        // const ChangeStreams = await monitorRequests(postModel, 'Change Stream starts for Post Modal.....')
        const newpost = new postModel({
            postCaption: postcaptions,
            postImagesURls: postimagesURLs,
            users: UserId
        });
        const savedPost = await newpost.save();


        //Closing Streams on Post modal
        // closeChangeStreams(ChangeStreams);
        res.status(201).send({ message: 'Post added successfully!', savedPost });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//get post
router.get('/get-Post', authorization, async (req, res) => {
    try {
        const UserId = req.userId;
        const posts = await postModel.find({ users: UserId });
        if (posts.length > 0) {
            return res.status(200).json(posts);
        } else {
            return res.status(404).send({ message: "no post found!" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", });
    }
});
//serch potential connections
router.get('/search_potential_connetion', authorization, async (req, res) => {
    const UserId = req.userId;
    const loggedInUser = userModel.findById(UserId);
    if (loggedInUser) {
        const { username } = req.query
        const user = await userModel.find({ firstName: username }).select('firstName')
        res.status(200).send(user)
    } else {
        res.sendStatus(500)
    }
})
export default router;