import express from "express";
import dotenv from 'dotenv'
import multer from 'multer';
import { authorization } from '../middleware/AuthMiddleware.js';
import postModel from "../models/Post.js";
import userModel from "../models/user.js";
const storage = multer.memoryStorage();
const uploadPostMedia = multer({ storage: storage, limits: { fileSize: 300 * 300 * 2 } })
const router = express.Router()
//Create Post
router.post('/createPost', authorization, async (req, res) => {
    const UserId = req.userId;
    const { postcaptions, postimagesURLs } = req.body;
    try {
        if (postcaptions == "" && postimagesURLs.length == 0) {
            res.status(404).send({ message: "No post found" });
        }
        const newpost = new postModel({
            postCaption: postcaptions,
            postImagesURls: postimagesURLs,
            users: UserId
        });
        const savedPost = await newpost.save();
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
            res.status(200).send({ message: "post found", posts: posts });
        } else {
            res.status(404).send({ message: "no post found!" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", });
    }
});

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