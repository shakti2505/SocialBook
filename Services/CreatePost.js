import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { authorization } from "../middleware/AuthMiddleware.js";
import postModel from "../models/Post.js";
import userModel from "../models/user.js";
import monitorRequests from "../ChangeStreams/ChangeStreams.js";
import friendRequestModal from "../models/FrientRequest.js";
import UserFriendList from "../models/FriendList.js";
import monitor from "../ChangeStreams/ChangeStreams.js";

const storage = multer.memoryStorage();
const uploadPostMedia = multer({
  storage: storage,
  limits: { fileSize: 300 * 300 * 2 },
});
const router = express.Router();

const closeChangeStreams = (changeStreams, timeInMS = 60000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("closing the change streams  ");
      changeStreams.close();
      resolve();
    }, timeInMS);
  });
};

//Create Post

router.post("/createPost", authorization, async (req, res) => {
  const UserId = req.userId;
  const { postcaptions, postimagesURLs, postOwner, postOwnerDP } = req.body;
  try {
    if (postcaptions == "" && postimagesURLs.length == 0) {
      res.status(404).send({ message: "No post found" });
    }
    //staring Streams on Post modal
    const ChangeStreams = await monitor.monitorPosts(
      postModel,
      "Change Stream starts for Post Modal....."
    );
    const newpost = new postModel({
      postCaption: postcaptions,
      postImagesURls: postimagesURLs,
      users: UserId,
      postOwner: postOwner,
      postOwnerDP: postOwnerDP,
    });
    const savedPost = await newpost.save();

    //closing streams
    closeChangeStreams(ChangeStreams);
    res.status(201).send({ message: "Post added successfully!", savedPost });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//get post
router.get("/get-Post", authorization, async (req, res) => {
  try {
    const UserId = req.userId;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const skip = (page - 1) * pageSize;

    const total = await postModel.countDocuments({ users: UserId });

    const LoggedInUserfriends = await UserFriendList.find({ user: UserId });

    let friendsPosts = [];
    for (const item of LoggedInUserfriends) {
      const posts = await postModel.find({ users: item.friend_ID });
      friendsPosts = friendsPosts.concat(posts);
    }
    const userPosts = await postModel
      .find({ users: UserId })
      .skip(skip)
      .limit(pageSize);
    const allPosts = userPosts.concat(friendsPosts); // Concatenate userPosts and friendsPosts
    return res.status(200).json({
      posts: allPosts, // Return all posts
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/get_user_specific_posts", authorization, async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const friendsID = req.query.UserId;
    const skip = (page - 1) * pageSize;

    const total = await postModel.countDocuments({ users: friendsID });

    const posts = await postModel.find({ users: friendsID });
    return res.status(200).json({
      posts: posts,
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

//serch potential connections

router.get("/search_potential_connetion", authorization, async (req, res) => {
  const UserId = req.userId;
  const loggedInUser = userModel.findById(UserId);
  if (loggedInUser) {
    const { username } = req.query;
    const users = await userModel.find({});
    const matchingUsers = users.filter(
      (user) => user.firstName.toLowerCase() === username.toLowerCase()
    );
    return res.status(200).json({ matchingUsers });
  } else {
    return res.sendStatus(500);
  }
});
// router.get("/search_potential_connection", authorization, async (req, res) => {
//   try {
//     const UserId = req.userId;
//     const loggedInUser = await userModel.findById(UserId);
//     if (loggedInUser) {
//       const { username } = req.query;
//       const users = await userModel.find({}).select("firstName");
//       const matchingUsers = users.filter(user => user.firstName.toLowerCase() === username.toLowerCase());
//       return res.status(200).json({matchingUsers:matchingUsers});
//     } else {
//       return res.status(401).send('No user found');
//     }
//   } catch (error) {
//     console.error("Internal server error:", error);
//     return res.status(500).send('internal server error');
//   }
// });

// get Post's of Friends
router.get("/get_friends_Posts", authorization, async (req, res) => {
  try {
    const UserId = req.userId;
    const loggedInUser = await userModel.findById(UserId);
    if (!loggedInUser) {
      return res.status(401).send("No logged In user found!");
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

//edit Posts
router.put("/edit_post", authorization, (req, res) => {
  try {
    const { PostID, PostCaption, postImages } = req.body;
    if (!PostID) {
      return res.status(401).send("Post ID is required");
    }
    const target_post = postModel.findByIdAndUpdate(PostID, {
      postCaption: PostCaption,
      postImagesURls: postImages,
    });
    return res
      .status(201)
      .send({ Message: "Post updated Successfully", target_post });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

//Like post By ID
router.post("/like_post", authorization, async (req, res) => {
  try {
    const { postID } = req.body;
    const UserId = req.userId;
    const loggedInUser = await userModel.findById(UserId);
    if (!postID) {
      return res.status(402).json({ message: "Post id is required" });
    }
    const currentDateAndTime = new Date().toLocaleString();
    const target_post = await postModel.findById(postID);
    target_post.LikedBy.push({
      name: loggedInUser.firstName + " " + loggedInUser.LastName,
      user_id: loggedInUser._id,
      email:loggedInUser.email,
      likedAt: currentDateAndTime,
    });
    target_post.save();
    
     await postModel.findByIdAndUpdate(postID, {
      likeCount: target_post.likeCount === 0 ? 1 : target_post.likeCount + 1
    });
    return res.status(200).json({ message: "Liked post successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

export default router;
